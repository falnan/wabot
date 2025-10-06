import { askGemini } from "./askGemini.js";

export async function classifyMessage(text) {
  try {
    const prompt = `
      Kamu adalah sistem klasifikasi pesan.
      Tentukan kategori pesan berikut ke dalam salah satu dari:
      [layanan, pengaduan, kontak, lainnya].
      Jawab hanya dengan 1 kata kategori, tanpa penjelasan.

      Pesan: "${text}"
    `;

    const result = await askGemini(prompt);
    const category = result.toLowerCase().trim();

    // Pastikan hasilnya valid
    if (["layanan", "pengaduan", "kontak", "lainnya"].includes(category)) {
      return category;
    }
    return "lainnya";
  } catch (err) {
    console.error("Error di klasifikasi pesan:", err.message);
    return "lainnya";
  }
}
