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
