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
  const prompt = `Translate ONLY the Italian word or phrase "${word}" into English. Do NOT translate the entire sentence. Use the sentence "${sentence}" ONLY for context to choose the correct meaning. Return JUST the English translation of "${word}".`;
  
  const response = await client.chat.complete({
    model: "mistral-medium-latest",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  const content = response.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content;
  // Handle array content (e.g. multimodal) if necessary, though unlikely for this model/use-case
  if (Array.isArray(content)) {
    return content.map(c => {
      if ('text' in c) return c.text;
      return '';
    }).join('');
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
  const prompt = `Rewrite the following Italian sentence for a "${level}" level learner. Keep the original meaning but adjust vocabulary and grammar. Sentence: "${sentence}". Provide ONLY the rewritten Italian sentence.`;
  
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
