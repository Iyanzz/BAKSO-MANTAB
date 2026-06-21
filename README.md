# 🍜 Bakso Mantap Jaya — Website Delivery & Booking

> ⚠️ **PERHATIAN: Data bisnis di seluruh proyek ini masih SAMARAN/DEMO.**
> Ganti semua data asli (nama, no. WA, alamat, RT/RW ongkir, foto) sebelum website dirilis ke publik.

---

## 🎯 Tujuan Website
Website statis full-featured untuk warung bakso & mie ayam lokal dengan dua fungsi utama:
1. **Pesan Delivery / Pickup** — pilih menu, checkout, kirim pesanan via WhatsApp
2. **Booking Meja (Dine-In)** — reservasi tempat duduk + estimasi menu via WhatsApp

---

## ✅ Fitur yang Sudah Selesai

| Fitur | Status |
|---|---|
| Navbar sticky responsif + hamburger mobile | ✅ |
| Hero section fullscreen dengan CTA 3 tombol | ✅ |
| Stats bar highlight keunggulan bisnis | ✅ |
| Galeri interior 8 foto + lightbox keyboard-navigable | ✅ |
| Menu 3 kategori (Makanan, Tambahan, Minuman) | ✅ |
| Sistem qty per item (+/− di kartu menu) | ✅ |
| Keranjang belanja real-time (state browser) | ✅ |
| Pilihan metode: Delivery / Pickup | ✅ |
| Dropdown RT/RW + kalkulasi ongkir otomatis | ✅ |
| Validasi area tidak terlayani + redirect WA | ✅ |
| Form checkout (nama, HP, alamat, catatan) | ✅ |
| Ringkasan harga: subtotal + ongkir = total | ✅ |
| Template pesan WA otomatis (Delivery/Pickup) | ✅ |
| Form Booking Meja (nama, HP, tanggal, jam, jumlah orang) | ✅ |
| Estimasi menu opsional di booking | ✅ |
| Template pesan WA otomatis (Booking) | ✅ |
| Tabel area delivery & ongkir | ✅ |
| Section Lokasi + Google Maps embed | ✅ |
| Section Kontak (WA, Instagram, TikTok) | ✅ |
| Footer lengkap | ✅ |
| Floating cart button (mobile) | ✅ |
| Toast notification saat tambah item | ✅ |
| Responsive mobile-first | ✅ |
| Active nav highlight saat scroll | ✅ |

---

## 📁 Struktur File

```
index.html              — Halaman utama (single page)
css/
  style.css             — Semua styling (tema warm/street food)
js/
  data.js               — Master data: menu, area delivery, galeri, config bisnis
  cart.js               — Manajemen keranjang belanja & toast
  menu.js               — Render grid menu (utama & booking)
  gallery.js            — Galeri + lightbox
  booking.js            — Form booking meja + WA redirect
  checkout.js           — Form checkout order + WA redirect
  app.js                — Inisialisasi utama & event listeners
README.md
```

---

## 🔗 Entry Points / Anchor Sections

| Section | Anchor URL |
|---|---|
| Hero (atas halaman) | `/#hero` |
| Galeri Interior | `/#galeri` |
| Menu & Harga | `/#menu` |
| Keranjang & Checkout | `/#keranjang` |
| Area Delivery | `/#area-delivery` |
| Booking Meja | `/#booking` |
| Lokasi & Kontak | `/#lokasi` |

---

## 🗂 Data & Konfigurasi

### File: `js/data.js`
Semua data bisnis tersimpan di satu file ini. Ini yang **wajib diubah** sebelum live:

```
BUSINESS_CONFIG     → nama, no WA, IG, TikTok, alamat, jam buka
MENU_DATA           → semua item menu per kategori (makanan/tambahan/minuman)
DELIVERY_AREAS      → daftar RT/RW + ongkir per area
GALLERY_DATA        → URL foto + caption galeri interior
```

### Format No. WhatsApp
Gunakan format tanpa `+` dan tanpa `0` di depan:
- `081234567890` → `6281234567890`

---

## ⚠️ Checklist Sebelum Rilis ke Publik

- [ ] **`js/data.js`** → Ganti `BUSINESS_CONFIG` dengan data asli (nama, WA, IG, TikTok, alamat)
- [ ] **`js/data.js`** → Konfirmasi harga Bakso Komplit (Rp11.000) & Mie Ayam Ceker ke pemilik
- [ ] **`js/data.js`** → Update `DELIVERY_AREAS` dengan RT/RW asli yang dilayani + ongkir aktual
- [ ] **`js/data.js`** → Ganti `GALLERY_DATA` dengan URL foto asli (interior & suasana toko)
- [ ] **`index.html`** → Ganti koordinat Google Maps embed dengan lokasi toko asli
- [ ] **`index.html`** → Update semua link WA, IG, TikTok ke akun asli
- [ ] **Foto produk** → Tambahkan foto close-up per item menu (ganti placeholder emoji di `menu-card-img-placeholder`)
- [ ] **Foto galeri** → Minimal 6–8 foto asli interior toko (pemotretan langsung)
- [ ] **Logo** → Tambahkan logo bisnis ke navbar & footer (jika sudah ada)
- [ ] **Hapus semua label ⚠️ "samaran"** dari footer dan komentar

---

## 📲 Template Pesan WhatsApp

### Order Delivery/Pickup
```
Halo Bakso Mantap Jaya, saya ingin pesan:

Pesanan:
- Bakso Daging ×2 = Rp30.000
- Es Teh Manis ×2 = Rp10.000

Metode: Delivery
RT/RW: RT 01/RW 01 (sekitar toko)
Alamat: Jl. Contoh RT 01/RW 01 No. 5
Nama: Budi
No. HP: 08123456789
Catatan: Kurang pedas

Subtotal: Rp40.000
Ongkir: Rp3.000
Total: Rp43.000

Mohon konfirmasi pesanan saya. Terima kasih.
```

### Booking Meja
```
Halo Bakso Mantap Jaya, saya ingin booking meja:
Nama: Budi
No. HP: 08123456789
Tanggal: 01/01/2025
Jam: 12:00
Jumlah orang: 4

Estimasi pesanan (opsional):
- Bakso Daging ×4 = Rp60.000

Total estimasi: Rp60.000
Catatan: Ada yang berulang tahun

Mohon konfirmasi ketersediaan meja. Terima kasih.
```

---

## 🎨 Style Guide
- **Warna utama:** Merah `#D63B1F` + Oranye `#F5A623`
- **Background:** Krem hangat `#FDF6EE`
- **Font:** Poppins (heading) + Nunito (body)
- **Mood:** Street food bersih & terpercaya — hangat, menggugah selera

---

## 🚀 Cara Deploy
1. Pastikan semua data di `js/data.js` sudah diisi dengan data asli
2. Tambahkan foto produk & foto galeri asli
3. Pergi ke **tab Publish** untuk mempublikasikan website
4. Website siap diakses publik!

---

*Website dibuat dengan HTML5, CSS3, dan Vanilla JavaScript — tanpa framework berat, loading cepat di HP.*
