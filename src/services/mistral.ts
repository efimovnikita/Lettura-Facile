import { Mistral } from '@mistralai/mistralai';

let cachedClient: Mistral | null = null;
let cachedKey: string = "";

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
  const client = getMistralClient(apiKey);

  const response = await client.chat.complete({
    model: "mistral-medium-latest",
    messages: [
      {
        role: "system",
        content: `You are a precise translator.
        Your task: Translate the specific Italian word/phrase provided by the user into English.
        Context: Use the provided sentence ONLY to understand the correct sense of the word.
        Rules:
        1. Output ONLY the English translation.
        2. NO punctuation (unless part of the word).
        3. NO explanations or context.
        4. NO quotes.`
      },
      {
        role: "user",
        content: `Word: "${word}"\nSentence context: "${sentence}"`
      }
    ],
    temperature: 0 // Максимальная точность и краткость
  });

  const content = response.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content.trim().replace(/[".]/g, '');

  // Обработка массива (на всякий случай)
  if (Array.isArray(content)) {
    return content.map(c => ('text' in c ? c.text : '')).join('').trim().replace(/[".]/g, '');
  }
  return "";
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
