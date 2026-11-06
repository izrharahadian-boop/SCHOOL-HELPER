# PintarAI — Prototype Website

Website prototype untuk konsep platform belajar berbantuan AI bagi siswa.

## Fitur yang tersedia di prototype
- Tampilan responsif untuk desktop dan ponsel.
- Unggah/foto halaman buku dan pratinjau gambar.
- Input teks materi.
- Pilihan aktivitas: rangkuman, kuis pilihan ganda, penjelasan, kerangka artikel, dan panduan mencari sumber.
- Kuis interaktif dengan umpan balik jawaban.
- Tidak memerlukan instalasi atau build tools.

## Cara menjalankan
Buka `index.html` di browser. Untuk pengalaman terbaik, jalankan melalui GitHub Pages.

## Cara upload ke GitHub
1. Buat repository baru, misalnya `pintarai-website`.
2. Pilih **Public** jika ingin website dapat diakses publik.
3. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke root repository.
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
7. Tunggu proses deployment. GitHub akan memberikan URL website.

## Catatan penting: integrasi AI belum aktif
Ini adalah prototype front-end. Fitur pembuatan konten saat ini memakai contoh/demo lokal di browser, bukan model AI sungguhan. Foto hanya ditampilkan sebagai preview; teks dari foto belum dibaca otomatis (OCR).

Untuk versi produksi, hubungkan front-end ke backend/API AI yang aman:
- OCR/vision untuk membaca foto buku.
- Model AI untuk membuat penjelasan, rangkuman, kuis, dan kerangka artikel.
- Pencarian web/sumber dengan tautan dan metadata agar referensi dapat diverifikasi.
- Penyimpanan progres belajar jika memang dibutuhkan.

**Jangan pernah menaruh API key AI di `script.js` atau file front-end publik.** Simpan API key di environment variables pada backend/serverless function. GitHub Pages hanya meng-host file statis dan tidak menjalankan backend.

## Struktur
```text
pintarai-website/
├── index.html
├── style.css
├── script.js
└── README.md
```
