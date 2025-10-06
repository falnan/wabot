import express from "express";
import { handleIncomingMessage } from "../controllers/chatHandler.js";
import "dotenv/config";

const router = express.Router();
const verify_token = process.env.VERIFY_TOKEN;

//whatsapp webhook verification
router.get("/", (req, res) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === verify_token) {
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

//message
router.post("/", handleIncomingMessage);
export default router;

// router.post("/", async (req, res) => {
//   try {
//     if (req.body.entry?.[0].changes?.[0].value?.messages) {
//       const message = req.body.entry[0].changes[0].value.messages[0];
//       const sender = message.from;
//       const text = message.text?.body || "";
//       console.log(`Pesan masuk dari ${sender}: ${text}`);

//       //logic reply
//       //1. jika ada state kurang dari 1 hari, langsung tempilkan.....
//       //2. jika belum ada state, kirim perkenalan....
//     }

//     res.sendStatus(200);
//   } catch (err) {
//     console.error("Error:", err.message);
//     res.sendStatus(500);
//   }
// });
