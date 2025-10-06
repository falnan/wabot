import { sendMessage } from "../services/sendMessage.js";
import { classifyMessage } from "../services/classifyMessage.js";
import { updateUserActivity, isRecentChat } from "../services/userHistory.js";
import { menuTemplate } from "../menu.js";

export async function handleIncomingMessage(req, res) {
  try {
    const message = req.body.entry?.[0].changes?.[0].value?.messages?.[0];
    if (!message) return res.sendStatus(200);
    const sender = message.from;
    const text = message.text?.body || "";
    console.log(`Pesan masuk dari ${sender}: ${text}`);

    // Cek apakah user baru chat dalam 24 jam terakhir
    const recentlyActive = isRecentChat(sender);
    let reply = "";

    if (recentlyActive) {
      // 🔹 Dalam 24 jam → klasifikasi dengan AI
      const category = await classifyMessage(text);
      console.log(`Kategori terdeteksi: ${category}`);

      reply = menuTemplate[category] || menuTemplate.default;
    } else {
      // 🔹 Lebih dari 24 jam → kirim salam pembuka
      reply = menuTemplate.greeting;
    } // Kirim balasan ke WhatsApp
    await sendMessage(sender, reply);

    // Update waktu aktivitas user
    updateUserActivity(sender);

    res.sendStatus(200);
  } catch (err) {
    console.error(" Error di handleIncomingMessage:", err.message);
    console.error(err.stack);

    res.sendStatus(500);
    throw err;
  }
}
