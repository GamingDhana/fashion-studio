import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing");
  process.exit(1);
}

console.log("API key found:", apiKey.slice(0, 8) + "...");

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

try {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: "Say hello in one sentence.",
  });

  console.log("SUCCESS");
  console.log(response.text);
} catch (error) {
  console.error("========== GEMINI ERROR ==========");
  console.error(error);
}