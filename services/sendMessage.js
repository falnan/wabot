import axios from "axios";
import "dotenv/config";

const phone_number_id = process.env.PHONE_NUMBER_ID;
const whatsapp_access_token = process.env.WHATSAPP_ACCESS_TOKEN;

export async function sendMessage(to, text) {
  try {
    const res = await axios.post(
      `https://graph.facebook.com/v21.0/${phone_number_id}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${whatsapp_access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
    // console.log(response.data);
  } catch (error) {
    console.error(" Error di sendMessage:", err.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}
