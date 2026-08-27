import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

console.log("API key exists:", Boolean(apiKey));

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing.");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey,
});

try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello in one short sentence.",
  });

  console.log("========== GEMINI SUCCESS ==========");
  console.log(response.text);
} catch (error) {
  console.error("========== GEMINI ERROR ==========");
  console.error(error);
}