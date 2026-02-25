import { Mistral } from '@mistralai/mistralai';

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

export async function translateWord(apiKey: string, word: string, sentence: string) {
  // 1. Формируем уникальный ключ, связывая слово и контекст
  const cacheKey = `${word.toLowerCase().trim()}|||${sentence.trim()}`;

  // 2. Проверяем, есть ли уже перевод в кэше
  if (wordTranslationCache.has(cacheKey)) {
    return wordTranslationCache.get(cacheKey)!;
  }

  const client = getMistralClient(apiKey);

  const response = await client.chat.complete({
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
  });

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

  const response = await client.chat.complete({
    model: "mistral-small-latest",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

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

export async function simplifySentence(apiKey: string, sentence: string, level: string) {
  if (level === 'original') return sentence;

  const client = getMistralClient(apiKey);

  const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: `You are a linguistic processor. Your ONLY task is to rewrite Italian sentences for a ${level} level learner.
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
    });

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
