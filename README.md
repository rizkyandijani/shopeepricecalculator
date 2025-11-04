# Shopee Indonesia Price Calculator

Kalkulator harga Shopee Indonesia ini sekarang dibangun sebagai aplikasi JavaScript murni yang
berjalan langsung di browser tanpa perlu mengunduh paket npm. Antarmuka dan logika hitungnya tetap
mengadopsi preset kategori/tier dari panduan edukasi Shopee [Cara Menentukan Harga Jual Produk](https://seller.shopee.co.id/edu/article/7187)
agar penjual dapat mengisi biaya program secara otomatis tanpa mengetik persentase manual.

## Fitur

- **Preset kategori & status toko.** Pilih kategori dan tier (Non-Program, Star, Star+) untuk
  mengisi otomatis komisi, Gratis Ongkir XTRA, program cashback, voucher, hingga biaya layanan lain.
- **Input biaya rupiah lengkap.** Masukkan HPP, logistik, subsidi voucher/koin, subsidi ongkir,
  serta biaya tetap lainnya pada satu layar.
- **Ringkasan profit real-time.** Kalkulator menampilkan harga jual rekomendasi, total biaya
  persentase, profit estimasi, dan efektivitas margin sekaligus peringatan bila total persentase
  melebihi 100%.
- **Tidak bergantung npm registry.** Seluruh dependensi disertakan di repo sehingga `npm install`
  tidak melakukan koneksi ke internet—mengatasi kegagalan 403 pada lingkungan yang dibatasi.

## Pratinjau Cepat

Jalankan server pratinjau bawaan dan buka URL yang diinformasikan di konsol:

```bash
npm install
npm run preview
```

Perintah di atas akan menyalakan server statis pada `http://localhost:4173`. Tempel URL itu di
peramban untuk melihat kalkulator secara langsung tanpa konfigurasi tambahan. Bila Anda memakai
lingkungan yang memblokir port kustom, Anda juga bisa membuka berkas `index.html` secara langsung
di browser—semua skrip dan gaya sudah tertanam di repo ini.

## Deploy ke Cloudflare Pages

Cloudflare Pages mewajibkan perintah build, (opsional) perintah deploy, dan direktori output.
Gunakan konfigurasi berikut:

- **Build command:** `npm run build`
- **Deploy command:** `npm run deploy`
- **Output directory:** `dist`

Perintah `npm run build` menjalankan skrip Node sederhana (`scripts/build.mjs`) yang menyalin
`index.html`, `styles.css`, dan seluruh folder `app/` ke dalam direktori `dist/`. Setelah build
selesai, Cloudflare Pages akan menerbitkan isi `dist/` sebagai situs statis.

## Menjalankan Secara Lokal

1. Pastikan Node.js 18 (atau lebih baru) terpasang.
2. Jalankan perintah berikut untuk menyalakan server pratinjau statis:

   ```bash
   npm install
   npm run preview
   ```

   Perintah `npm install` tidak mengunduh paket apa pun (dependensi kosong) sehingga selalu sukses
   meskipun tanpa akses registry. `npm run preview` menjalankan server HTTP sederhana di
   `http://localhost:4173` untuk menayangkan berkas statis.

3. Untuk alias cepat, `npm run dev` menjalankan server yang sama pada port 4173.

## Struktur Proyek

- `index.html` – Halaman utama yang memuat kalkulator dan mengimpor modul-modul JavaScript.
- `styles.css` – Styling responsif untuk tata letak, kartu ringkasan, dan tabel breakdown.
- `app/` – Modul JavaScript:
  - `category-presets.js` berisi preset biaya per kategori/tier dari artikel Shopee.
  - `calculator.js` menghitung rekomendasi harga jual, profit, dan breakdown biaya.
  - `main.js` mengelola state, rendering DOM, serta handler input.
- `server/preview.mjs` – Server HTTP ringan berbasis Node.js tanpa dependensi eksternal.

## Rumus Perhitungan

1. **Biaya tetap** mencakup HPP, logistik, subsidi voucher/koin, subsidi ongkir, dan biaya tetap
   lain yang ditanggung penjual.
2. **Biaya persentase** menjumlahkan komisi marketplace, program Gratis Ongkir, Cashback, Voucher,
   biaya layanan transaksi, PPN, serta persentase tambahan dari kampanye lain.
3. **Harga jual rekomendasi** dihitung dengan rumus:

   ```text
   Harga Jual = Total Biaya Tetap ÷ (1 − Total Persentase Biaya − Margin Target)
   ```

4. Jika total persentase biaya dan margin mencapai atau melampaui 100%, kalkulator memberi peringatan
   agar asumsi biaya disesuaikan sehingga harga jual tetap realistis.

## Lisensi

MIT
