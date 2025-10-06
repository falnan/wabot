// menu.js

export const menus = {
  main: {
    text: `Selamat datang di *BP3MI Riau* 👋
Silakan pilih layanan:
1. Informasi Layanan
2. Pengaduan
3. Kontak Petugas`,
    options: {
      1: "info",
      2: "pengaduan",
      3: "kontak",
    },
  },

  info: {
    text: `📖 Informasi Layanan BP3MI Riau:
1. Tata Cara Penempatan
2. Persyaratan Administrasi
0. Kembali`,
    options: {
      1: "info-penempatan",
      2: "info-syarat",
      0: "main",
    },
  },

  "info-penempatan": {
    text: `✈️ Tata Cara Penempatan PMI:
1. Daftar di BP3MI
2. Ikuti pelatihan
3. Proses keberangkatan resmi
0. Kembali`,
    options: { 0: "info" },
  },

  "info-syarat": {
    text: `📝 Persyaratan Administrasi:
- KTP
- KK
- Paspor
- Surat Keterangan Sehat
0. Kembali`,
    options: { 0: "info" },
  },

  pengaduan: {
    text: `📢 Pengaduan:
Silakan tulis isi pengaduan Anda.
(Ketik 0 untuk kembali ke menu utama)`,
    options: { 0: "main" },
  },

  kontak: {
    text: `☎️ Kontak Petugas BP3MI Riau:
- Telp: (0761) 123456
- Email: bp3mi-riau@example.com
0. Kembali`,
    options: { 0: "main" },
  },
};
