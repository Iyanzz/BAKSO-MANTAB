/**
 * data.js — Master data: menu, area delivery, galeri interior
 * Bakso Mantap Jaya
 *
 * ⚠️ DATA SAMARAN — Ganti dengan data asli sebelum website dirilis ke publik.
 */

/* ===================================================
   MENU DATA
   =================================================== */
const MENU_DATA = {
  makanan: [
    {
      id: 'bk-daging',
      name: 'Bakso Daging',
      price: 15000,
      category: 'makanan',
      emoji: '🍜',
      description: 'Bakso daging sapi pilihan, kuah gurih, kenyal sempurna.',
      note: '',
    },
    {
      id: 'bk-urat',
      name: 'Bakso Urat',
      price: 15000,
      category: 'makanan',
      emoji: '🥣',
      description: 'Bakso urat sapi, tekstur kenyal berserat, kuah panas.',
      note: '',
    },
    {
      id: 'bk-daging-urat',
      name: 'Bakso Daging & Urat',
      price: 17000,
      category: 'makanan',
      emoji: '🍜',
      description: 'Kombinasi bakso daging dan urat dalam satu mangkok.',
      note: '',
    },
    {
      id: 'bk-telur',
      name: 'Bakso Telur',
      price: 18000,
      category: 'makanan',
      emoji: '🥚',
      description: 'Bakso isi telur puyuh, ukuran besar, kenyang!',
      note: '',
    },
    {
      id: 'bk-komplit',
      name: 'Bakso Komplit',
      price: 11000,
      category: 'makanan',
      emoji: '🍲',
      description: 'Paket bakso lengkap dengan pilihan isian.',
      note: '⚠️ Konfirmasi ulang harga ke pemilik.',
    },
    {
      id: 'mie-ayam',
      name: 'Mie Ayam',
      price: 16000,
      category: 'makanan',
      emoji: '🍝',
      description: 'Mie lembut dengan tumis ayam bumbu kecap, segar dan gurih.',
      note: '',
    },
    {
      id: 'mie-ayam-bakso',
      name: 'Mie Ayam Bakso',
      price: 16000,
      category: 'makanan',
      emoji: '🍝',
      description: 'Mie ayam + bakso daging, kombinasi favorit!',
      note: '',
    },
    {
      id: 'mie-ayam-ceker',
      name: 'Mie Ayam Ceker',
      price: 16000,
      category: 'makanan',
      emoji: '🍗',
      description: 'Mie ayam dengan ceker ayam empuk berbumbu.',
      note: '⚠️ Konfirmasi ulang harga ke pemilik.',
    },
  ],
  tambahan: [
    {
      id: 'bij-daging',
      name: 'Bijian Bakso Daging',
      price: 4000,
      category: 'tambahan',
      emoji: '⚪',
      description: 'Tambahan bakso daging per biji.',
      note: '',
    },
    {
      id: 'bij-urat',
      name: 'Bijian Bakso Urat',
      price: 4000,
      category: 'tambahan',
      emoji: '⚪',
      description: 'Tambahan bakso urat per biji.',
      note: '',
    },
    {
      id: 'bij-telur',
      name: 'Bijian Bakso Telur',
      price: 5000,
      category: 'tambahan',
      emoji: '🟡',
      description: 'Tambahan bakso telur per biji.',
      note: '',
    },
    {
      id: 'bij-tahu',
      name: 'Bijian Tahu Bakso',
      price: 5000,
      category: 'tambahan',
      emoji: '🟨',
      description: 'Tahu isi adonan bakso, gurih dan krispy.',
      note: '',
    },
    {
      id: 'soun',
      name: 'Soun',
      price: 5000,
      category: 'tambahan',
      emoji: '🍜',
      description: 'Tambahan soun / bihun untuk melengkapi mangkok.',
      note: '',
    },
    {
      id: 'sate-tetelan',
      name: 'Sate Tetelan',
      price: 6000,
      category: 'tambahan',
      emoji: '🍢',
      description: 'Sate tetelan sapi, empuk dan berbumbu.',
      note: '',
    },
    {
      id: 'lontong',
      name: 'Lontong',
      price: 4000,
      category: 'tambahan',
      emoji: '🫘',
      description: 'Lontong nasi, cocok sebagai pengganti nasi.',
      note: '',
    },
    {
      id: 'krupuk-tengiri',
      name: 'Krupuk Tengiri',
      price: 2000,
      category: 'tambahan',
      emoji: '🍘',
      description: 'Kerupuk ikan tengiri, renyah.',
      note: '',
    },
    {
      id: 'krupuk-bandung',
      name: 'Krupuk Bandung',
      price: 1000,
      category: 'tambahan',
      emoji: '🍘',
      description: 'Kerupuk Bandung tipis dan renyah.',
      note: '',
    },
  ],
  minuman: [
    {
      id: 'es-lumut',
      name: 'Es Lumut',
      price: 9000,
      category: 'minuman',
      emoji: '🟢',
      description: 'Minuman segar khas, hijau menyegarkan.',
      note: '',
    },
    {
      id: 'es-teh-manis',
      name: 'Es Teh / Teh Panas (Manis)',
      price: 5000,
      category: 'minuman',
      emoji: '🍵',
      description: 'Teh manis hangat atau es teh manis segar.',
      note: '',
    },
    {
      id: 'es-teh-tawar',
      name: 'Es Teh / Teh Panas (Tawar)',
      price: 4000,
      category: 'minuman',
      emoji: '🍵',
      description: 'Teh tawar hangat atau dingin.',
      note: '',
    },
    {
      id: 'es-jeruk-manis',
      name: 'Es Jeruk / Jeruk Panas (Manis)',
      price: 7000,
      category: 'minuman',
      emoji: '🍊',
      description: 'Jeruk manis segar, panas atau dingin.',
      note: '',
    },
    {
      id: 'es-jeruk-tawar',
      name: 'Es Jeruk / Jeruk Panas (Tawar)',
      price: 6000,
      category: 'minuman',
      emoji: '🍋',
      description: 'Jeruk tawar segar, panas atau dingin.',
      note: '',
    },
    {
      id: 'air-mineral',
      name: 'Air Mineral',
      price: 4000,
      category: 'minuman',
      emoji: '💧',
      description: 'Air mineral botol.',
      note: '',
    },
    {
      id: 'air-mineral-dingin',
      name: 'Air Mineral Dingin',
      price: 5000,
      category: 'minuman',
      emoji: '🧊',
      description: 'Air mineral botol dingin.',
      note: '',
    },
    {
      id: 'es-batu',
      name: 'Es Batu',
      price: 2000,
      category: 'minuman',
      emoji: '🧊',
      description: 'Tambahan es batu untuk minumanmu.',
      note: '',
    },
  ],
};

/* ===================================================
   SEMUA MENU FLAT (untuk lookup)
   =================================================== */
const ALL_MENU = [
  ...MENU_DATA.makanan,
  ...MENU_DATA.tambahan,
  ...MENU_DATA.minuman,
];

/* ===================================================
   AREA DELIVERY & ONGKIR
   ⚠️ SAMARAN — Ganti dengan data asli (RT/RW & ongkir)
   =================================================== */
const DELIVERY_AREAS = [
  { id: 'rt01rw01', label: 'RT 01/RW 01 (sekitar toko)', ongkir: 3000 },
  { id: 'rt02rw01', label: 'RT 02/RW 01',                ongkir: 3000 },
  { id: 'rt03rw01', label: 'RT 03/RW 01',                ongkir: 3000 },
  { id: 'rt01rw02', label: 'RT 01/RW 02',                ongkir: 5000 },
  { id: 'rt02rw02', label: 'RT 02/RW 02',                ongkir: 5000 },
  { id: 'rt03rw02', label: 'RT 03/RW 02',                ongkir: 5000 },
  { id: 'rt01rw03', label: 'RT 01/RW 03',                ongkir: 7000 },
  { id: 'rt02rw03', label: 'RT 02/RW 03 (terjauh)',      ongkir: 7000 },
];

/* ===================================================
   GALERI INTERIOR
   ⚠️ Foto placeholder dari Unsplash (bukan foto asli toko)
      Ganti URL dengan foto asli sebelum dirilis ke publik.
   =================================================== */
const GALLERY_DATA = [
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    caption: 'Area makan yang nyaman dan bersih',
    alt: 'Suasana dalam restoran',
  },
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    caption: 'Hidangan segar langsung dari dapur',
    alt: 'Makanan segar tersaji',
  },
  {
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    caption: 'Menu andalan: bakso kuah panas',
    alt: 'Semangkuk bakso',
  },
  {
    url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80',
    caption: 'Meja kursi tertata rapi',
    alt: 'Area tempat duduk',
  },
  {
    url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    caption: 'Suasana warung yang hangat & ramah',
    alt: 'Suasana warung',
  },
  {
    url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    caption: 'Siap melayani dari pagi hingga malam',
    alt: 'Interior restoran',
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    caption: 'Topping lengkap untuk bakso favoritmu',
    alt: 'Bakso dengan topping',
  },
  {
    url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    caption: 'Ramai pengunjung setiap hari',
    alt: 'Pengunjung makan di tempat',
  },
];

/* ===================================================
   KONFIGURASI BISNIS
   ⚠️ SAMARAN — Ganti dengan data asli
   =================================================== */
const BUSINESS_CONFIG = {
  name:       'Bakso Mantap Jaya',
  wa_number:  '6281336307404',   // format tanpa +
  instagram:  'baksomantapjaya',
  tiktok:     'bakso.mantap.jaya',
  address:    'Jl. Contoh Raya No 1, Blora',
  maps_url:   'https://maps.google.com/?q=-6.97,111.42',
  hours: {
    weekday: '07.00 – 21.00',
    weekend: '07.00 – 22.00',
  },
};
