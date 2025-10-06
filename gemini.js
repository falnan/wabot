// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// fungsi untuk kirim pertanyaan ke Gemini
export async function askGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Error Gemini:", err);
    return "Maaf, sistem sedang error. Silakan coba lagi nanti 🙏";
  }
}
