import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({});

export async function askGemini(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
    // console.log(response.text);
  } catch (error) {
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Detail:", error.response.data);
    } else {
      console.error("Pesan:", error.message);
    }
    throw error;
  }
}
