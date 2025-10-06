import express from "express";
import axios from "axios";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;
const phone_number = process.env.PHONE_NUMBER_ID;
const whatsapp_token = process.env.WHATSAPP_TOKEN;
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fungsi kirim pesan ke WhatsApp
async function sendMessage(to, text) {
  await axios.post(
    `https://graph.facebook.com/v21.0/${phone_number}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      text: { body: text },
    },
    {
      headers: {
        Authorization: `Bearer ${whatsapp_token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

// Fungsi tanya ke Gemini
async function askGemini(prompt) {
  const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// GET → verifikasi webhook WhatsApp
app.get("/", (req, res) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === verifyToken) {
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// POST → pesan masuk
app.post("/", async (req, res) => {
  try {
    if (req.body.entry?.[0].changes?.[0].value?.messages) {
      const message = req.body.entry[0].changes[0].value.messages[0];
      const sender = message.from;
      const text = message.text?.body || "";

      console.log(`Pesan masuk dari ${sender}: ${text}`);

      // Jawaban dari Gemini
      const reply = await askGemini(
        "jawab dengan 1 paragraph singkat: " + text
      );

      // Kirim ke WhatsApp
      await sendMessage(sender, reply);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Error:", err.message);
    res.sendStatus(500);
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server jalan di port ${port}`);
});
