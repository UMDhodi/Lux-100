
import { GoogleGenAI } from "@google/genai";

// Safe access to process.env.API_KEY
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch {
    return "";
  }
};

export const getStylingAdvice = async (userInput: string) => {
  const key = getApiKey();
  if (!key) return "Our exclusive concierge is momentarily offline. However, your elegance remains unquestioned.";
  
  const ai = new GoogleGenAI({ apiKey: key });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: "You are an elite, sophisticated AI fashion concierge for 'LUX-100', a brand selling sunglasses limited to only 100 pieces worldwide. Your tone is refined, futuristic, and exclusive. You help ultra-wealthy clients decide if they are ready for the 'Aethelgard' series. Keep responses concise, poetic, and highly luxurious. Use words like 'transcendence', 'legacy', 'sovereignty'.",
        temperature: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stars are aligning for your vision. Our craftsmen await your command.";
  }
};
