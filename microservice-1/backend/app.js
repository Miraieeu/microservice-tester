const express = require('express');
const axios = require('axios'); // 'redis' tidak lagi di-require karena tidak digunakan di versi app.js terbaru
const response = await axios.get('http://ms2-backend:5000/');
const app = express();
const port = 3000; // Menggunakan definisi port dari kode terbaru

// Inisialisasi client Redis dihapus karena tidak ada endpoint di versi app.js terbaru yang menggunakannya.
// Jika Redis masih diperlukan untuk fungsionalitas lain yang belum disebutkan, bagian ini bisa ditambahkan kembali.

// Endpoint utama MS1 (dari kode terbaru, menggantikan implementasi '/' sebelumnya)
app.get('/', (req, res) => {
  res.send('Halo dari Microservice 1 (Node.js)');
});

// Endpoint MS1 memanggil MS2 (dari kode terbaru, pesan respons diperbarui)
app.get('/call-ms2', async (req, res) => {
  try {
    const response = await axios.get('http://ms2-backend:5000/');
    res.send(`Microservice 1 menerima dari MS2: ${response.data}`);
  } catch (err) {
    res.status(500).send(`Gagal memanggil MS2: ${err.message}`);
  }
});

// Menggunakan app.listen dari kode terbaru dengan port variabel
// dan mempertahankan '0.0.0.0' untuk listening address dari versi sebelumnya agar konsisten dalam konteks microservice
app.listen(port, '0.0.0.0', () => {
  console.log(`Microservice 1 listening on port ${port}`);
});