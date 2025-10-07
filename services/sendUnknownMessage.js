import axios from "axios";
import "dotenv/config";

const phone_number_id = process.env.PHONE_NUMBER_ID;
const whatsapp_access_token = process.env.WHATSAPP_ACCESS_TOKEN;

export async function sendUnknownMessage(to) {
  await axios.post(
    `https://graph.facebook.com/v21.0/${phone_number_id}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "list",
        body: {
          text: `🙏 Mohon maaf, saat ini *Zapin AI* belum dapat memberikan jawaban akurat atas pertanyaan Anda. Silakan pilih layanan resmi BP3MI Riau yang sesuai di bawah ini.`,
        },
        footer: {
          text: "Zapin AI - Asisten Digital BP3MI Riau",
        },
        action: {
          button: "Lihat Layanan",
          sections: [
            {
              title: "Layanan Utama",
              rows: [
                {
                  id: "penelitian",
                  title: "Izin Penelitian",
                  description: "Ajukan izin penelitian di BP3MI Riau.",
                },
                {
                  id: "permintaan_data",
                  title: "Akses Data Resmi",
                  description: "Permintaan data resmi BP3MI Riau.",
                },
                {
                  id: "perizinan_magang",
                  title: "Izin Magang",
                  description: "Ajukan izin magang di BP3MI Riau.",
                },
                {
                  id: "permohonan_kerja_sama",
                  title: "Kerja Sama",
                  description: "Ajukan kerja sama kelembagaan.",
                },
                {
                  id: "inf_lowongan_kejr",
                  title: "Info Lowongan",
                  description: "Lihat daftar lowongan luar negeri resmi.",
                },
                {
                  id: "info_p3mi_riau",
                  title: "Daftar P3MI Riau",
                  description: "Lihat perusahaan penempatan resmi di Riau.",
                },
                {
                  id: "kendala_siskop2mi",
                  title: "Kendala SISKOP2MI",
                  description: "Laporkan kendala aplikasi SISKOP2MI.",
                },
              ],
            },
          ],
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${whatsapp_access_token}`,
      },
    }
  );
}

await sendUnknownMessage("6282285567722");
