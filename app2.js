import axios from "axios";
import express from "express";
import "dotenv/config";
import { menus } from "./menu.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;
const phone_number = process.env.PHONE_NUMBER_ID;
const whatsapp_token = process.env.WHATSAPP_TOKEN;

const userState = new Map();

function getUserState(userId) {
  let state = userState.get(userId);
  const now = Date.now();
  if (!state) {
    state = {
      step: "main",
      data: {},
      lastChating: now,
    };
    userState.set(userId, state);
  }

  if (now - state.lastChating > 30 * 60 * 1000) {
    state = {
      step: "main",
      data: {},
      lastChating: now,
    };
    userState.set(userId, state);
  }

  return state;
}

function setUserState(userId, newState) {
  newState.lastChating = Date.now();
  userState.set(userId, newState);
}

//helper send message
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

// webhook verify
app.get("/", (req, res) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === verifyToken) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// webhook message handler
app.post("/", async (req, res) => {
  try {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0].value.messages
    ) {
      const message = req.body.entry[0].changes[0].value.messages[0];
      const sender = message.from;
      const text = message.text?.body?.trim();

      console.log(`Pesan masuk dari ${sender}: ${text}`);

      // ambil state user
      let state = getUserState(sender);

      // cari menu berdasarkan step sekarang
      const currentMenu = menus[state.step];

      let reply = "";

      if (!currentMenu) {
        // fallback kalau menu tidak ada
        reply = "❌ Menu tidak dikenali. Kembali ke menu utama.";
        state.step = "main";
        setUserState(sender, state);
        await sendMessage(sender, menus["main"].text);
        return res.sendStatus(200);
      }

      // cek apakah input user ada di options
      const nextStep = currentMenu.options[text];

      if (nextStep) {
        // pindah ke step berikutnya
        state.step = nextStep;
        setUserState(sender, state);
        reply = menus[nextStep].text;
      } else {
        if (state.step === "pengaduan" && text !== "0") {
          // simpan pengaduan user
          state.data.pengaduan = text;
          setUserState(sender, state);
          reply = `🙏 Terima kasih, pengaduan Anda sudah kami terima:\n"${text}"\n\nKetik 0 untuk kembali ke menu utama.`;
        } else {
          reply = `❓ Pilihan tidak valid.\n\n${currentMenu.text}`;
        }
      }

      await sendMessage(sender, reply);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Error handling message:", err);
    res.sendStatus(500);
  }
});

// app.post("/", async (req, res) => {
//   if (
//     req.body.entry &&
//     req.body.entry[0].changes &&
//     req.body.entry[0].changes[0].value.messages
//   ) {
//     const message = req.body.entry[0].changes[0].value.messages[0];
//     const sender = message.from;
//     const text = message.text?.body || "";

//     console.log(`Pesan masuk dari ${sender}: ${text}`);

//     await sendMessage(sender, reply);
//   }

//   res.status(200).end();
// });

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
