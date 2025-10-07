import axios from "axios";
import "dotenv/config";

const phone_number_id = process.env.PHONE_NUMBER_ID;
const whatsapp_access_token = process.env.WHATSAPP_ACCESS_TOKEN;

const PIN_CODE = "697307";
const CERTIFICATE = `Cm8KKwi20L3c8PfhAhIGZW50OndhIhJDaGF0Ym90IEJQM01JIFJpYXVQltmUxwYaQFKNLx2IUw0wzaNWqQP5NpcCll76o1Lsy6b1bm4wkyQjBn4xfLcPEsAXw1OdCI+b4Scto6gWDidvDrIqZavqNQwSMG1WdLj95qaf8FqztJqkai6XX+flVMz0KV5aWNxKOtxe7T7D1CpUyNCGEAE6hg7fCQ==`;

async function registerNumber() {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${phone_number_id}/register`,
      {
        messaging_product: "whatsapp",
        pin: PIN_CODE,
        certificate: CERTIFICATE,
      },
      {
        headers: {
          Authorization: `Bearer ${whatsapp_access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Registration success:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("❌ Registration failed:", error.response.data);
    } else {
      console.error("⚠️ Error:", error.message);
    }
  }
}

registerNumber();
