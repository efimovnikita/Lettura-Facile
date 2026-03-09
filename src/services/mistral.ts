import { Mistral } from '@mistralai/mistralai';
import { SentimentData } from '../utils';

let cachedClient: Mistral | null = null;
let cachedKey: string = "";
const wordTranslationCache = new Map<string, string>();

const getMistralClient = (apiKey: string) => {
  const cleanKey = apiKey ? apiKey.trim() : "";

  if (!cleanKey) {
    throw new Error("Mistral API Key is missing");
  }

  // Check for non-ASCII characters in API key
  // eslint-disable-next-line no-control-regex
  if (/[^\x00-\x7F]/.test(cleanKey)) {
     throw new Error("API Key contains invalid characters (e.g. Cyrillic or emojis). Please use only English letters and numbers.");
  }

  if (cachedClient && cachedKey === cleanKey) {
    return cachedClient;
  }

  cachedClient = new Mistral({ apiKey: cleanKey });
  cachedKey = cleanKey;
  return cachedClient;
};

/**
 * Helper function to retry an async function with exponential backoff on 429 errors.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 5,
  initialDelay: number = 1000
): Promise<T> {
  let retries = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      // Retry only if it's a 429 (Too Many Requests) and we haven't exceeded max retries
      if (retries >= maxRetries || error.status !== 429) {
        throw error;
      }
      const delay = initialDelay * Math.pow(2, retries);
      console.warn(`Mistral API Rate Limit (429). Retrying in ${delay}ms... (Attempt ${retries + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      retries++;
    }
  }
}

export async function translateWord(apiKey: string, word: string, sentence: string) {
  // 1. Формируем уникальный ключ, связывая слово и контекст
  const cacheKey = `${word.toLowerCase().trim()}|||${sentence.trim()}`;

  // 2. Проверяем, есть ли уже перевод в кэше
  if (wordTranslationCache.has(cacheKey)) {
    return wordTranslationCache.get(cacheKey)!;
  }

  const client = getMistralClient(apiKey);

  const response = await withRetry(() => client.chat.complete({
    model: "mistral-medium-latest",
    messages: [
      {
        role: "system",
        content: `You are an API endpoint that provides direct dictionary translations.
        Your task: Translate the specific Italian word/phrase provided into English.
        Context: Use the provided sentence ONLY to understand the correct meaning and grammatical form.

        STRICT RULES:
        1. Output EXACTLY the English translation and nothing else.
        2. NO punctuation marks at the end (no periods, no exclamation marks).
        3. NO quotes around the output.
        4. NO conversational filler, explanations, or notes.`
      },
      {
        role: "user",
        content: `Word: "${word}"\nSentence context: "${sentence}"`
      }
    ],
    temperature: 0
  }));

  const content = response.choices?.[0]?.message?.content;

  // Создаем переменную для хранения итогового результата
  let result = "";

  if (typeof content === 'string') {
    // Дополнительная зачистка на случай, если модель все же ослушается
    result = content.trim().replace(/^["']|["']$/g, '').replace(/\.$/, '');
  } else if (Array.isArray(content)) {
    result = content.map(c => ('text' in c ? c.text : '')).join('').trim().replace(/^["']|["']$/g, '').replace(/\.$/, '');
  }

  // 3. Если мы получили не пустой результат, сохраняем его в кэш
  if (result) {
    wordTranslationCache.set(cacheKey, result);
  }

  return result;
}

export async function translateSentence(apiKey: string, sentence: string) {
  const client = getMistralClient(apiKey);
  const prompt = `Translate the following Italian sentence into English: "${sentence}". Provide ONLY the English translation.`;

  const response = await withRetry(() => client.chat.complete({
    model: "mistral-small-latest",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  }));

  const content = response.choices?.[0]?.message?.content;
  let result = "";

  if (typeof content === 'string') {
    result = content;
  } else if (Array.isArray(content)) {
    result = content.map(c => {
      if ('text' in c) return c.text;
      return '';
    }).join('');
  }

  return result.trim().replace(/^["']|["']$/g, '');
}

export async function simplifySentence(apiKey: string, sentence: string, level: string) {
  if (level === 'original') return sentence;

  const client = getMistralClient(apiKey);
  const targetLevel = level === 'simplified' ? 'beginner (A1/A2)' : level;

  const response = await withRetry(() => client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: `You are a linguistic processor. Your ONLY task is to rewrite Italian sentences for a ${targetLevel} level learner.
          Rules:
          1. Output ONLY the rewritten sentence.
          2. NO explanations, NO comments, NO parentheses, NO introductory text.
          3. Do not quote the output.`
        },
        {
          role: "user",
          content: sentence
        }
      ],
      temperature: 0 // Делает модель максимально строгой и последовательной
    }));

  const content = response.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map(c => {
      if ('text' in c) return c.text;
      return '';
    }).join('');
  }
  return "";
}

export async function getSentiments(apiKey: string, sentences: string[]): Promise<SentimentData[]> {
  const client = getMistralClient(apiKey);

  const response = await withRetry(() => client.chat.complete({
    model: "mistral-small-latest",
    messages: [
      {
        role: "system",
        content: `Analizza la tonalità e il sottotesto delle frasi italiane forните.
        Restituisci STRETTAMENTE un oggetto JSON con una chiave "results" che contiene un array di объектов.
        Categorie AMMESSE per "tone":
        - "neutral": narrazione piatta, fatti, descrizioni oggettive.
        - "positive": gioia, felicità, entusiasmo, successo.
        - "irony": sarcasmo, sottile umorismo, gioco di parole.
        - "aggressive": rabbia, conflitto, ostilità, odio.
        - "sad": dolore profondo, tristezza, lutto.
        - "urgent": ansia, pericolo, necessità immediata.
        - "romantic": affetto, tenerezza, amore dolce, gesti romantici.
        - "sexual": passione intensa, attrazione fisica, erotismo.
        - "nostalgic": ricordo del passato, mancanza di qualcuno, malinconia per il tempo andato.
        - "tension": imbarazzo, dubbio, gelosia, sottile conflitto relazionale.

        Per ogni frase, fornisci:
        - "tone": una delle categorie sopra.
        - "score": un numero da 0 a 1 che indica l'intensità.
        - "explanation": una brevissima spiegazione (max 10 parole) in italiano del perché.

        Esempio output:
        {
          "results": [
            {"tone": "romantic", "score": 0.9, "explanation": "Gesto di affetto profondo."},
            {"tone": "nostalgic", "score": 0.7, "explanation": "Ricordo malinconico di un amore passato."}
          ]
        }`
      },


      {
        role: "user",
        content: JSON.stringify(sentences)
      }
    ],
    temperature: 0,
    responseFormat: { type: "json_object" }
  }));

  const content = response.choices?.[0]?.message?.content;
  let jsonString = "";

  if (typeof content === 'string') {
    jsonString = content;
  } else if (Array.isArray(content)) {
    jsonString = content.map(c => ('text' in c ? c.text : '')).join('');
  }

  try {
    const parsed = JSON.parse(jsonString);
    return parsed.results || [];
  } catch (e) {
    console.error("Failed to parse sentiments JSON:", e);
    return [];
  }
}

export interface SynonymPair {
  original: string;
  synonym: string;
}

export async function getSynonyms(apiKey: string, sentences: string[]): Promise<SynonymPair[][]> {
  const client = getMistralClient(apiKey);

  const response = await withRetry(() => client.chat.complete({
    model: "mistral-medium-latest",
    messages: [
      {
        role: "system",
        content: `Identify Italian words in the provided sentences that correspond to CEFR level B1 or higher. 
        For each identified word, provide ONE simpler synonym (ideally CEFR level A1-A2) that is contextually appropriate.
        Return EXCLUSIVELY a JSON object with a key "results" which contains an array of arrays (one inner array per sentence).
        Each inner array should contain objects with "original" and "synonym" keys.
        If a sentence has no words at B1 level or higher, return an empty array for that sentence.

        Example output:
        {
          "results": [
            [{"original": "clandestino", "synonym": "segreto"}],
            [],
            [{"original": "perplesso", "synonym": "confuso"}, {"original": "tediato", "synonym": "annoiato"}]
          ]
        }`
      },
      {
        role: "user",
        content: JSON.stringify(sentences)
      }
    ],
    temperature: 0,
    responseFormat: { type: "json_object" }
  }));

  const content = response.choices?.[0]?.message?.content;
  let jsonString = "";

  if (typeof content === 'string') {
    jsonString = content;
  } else if (Array.isArray(content)) {
    jsonString = content.map(c => ('text' in c ? c.text : '')).join('');
  }

  try {
    const parsed = JSON.parse(jsonString);
    return parsed.results || [];
  } catch (e) {
    console.error("Failed to parse synonyms JSON:", e);
    return [];
  }
}
