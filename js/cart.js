/**
 * cart.js — Manajemen Keranjang Belanja
 * Bakso Mantap Jaya
 */

/* ===== STATE ===== */
let cart = [];          // [{ id, name, price, qty, emoji }]
let bookingCart = [];   // keranjang terpisah untuk estimasi menu booking

/* ===== UTILS ===== */
function formatRupiah(amount) {
  return 'Rp' + amount.toLocaleString('id-ID');
}

function getMenuById(id) {
  return ALL_MENU.find(item => item.id === id) || null;
}

/* ===== CART OPERATIONS ===== */

/** Tambah item ke cart utama (order) */
function addToCart(menuId, qty = 1) {
  const item = getMenuById(menuId);
  if (!item) return;

  const existing = cart.find(c => c.id === menuId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, qty, emoji: item.emoji });
  }
  renderCart();
  updateCartBadge();
  showToast(`${item.name} ditambahkan ke keranjang 🛒`);
}

/** Set qty item di cart (qty=0 → hapus) */
function setCartQty(menuId, qty) {
  if (qty <= 0) {
    removeFromCart(menuId);
    return;
  }
  const existing = cart.find(c => c.id === menuId);
  if (existing) {
    existing.qty = qty;
  } else {
    addToCart(menuId, qty);
    return;
  }
  renderCart();
  updateCartBadge();
  updateCheckoutSummary();
}

/** Hapus item dari cart */
function removeFromCart(menuId) {
  cart = cart.filter(c => c.id !== menuId);
  renderCart();
  updateCartBadge();
  updateCheckoutSummary();
  // Update qty display di menu card jika ada
  updateMenuCardQty(menuId, 0);
}

/** Kosongkan semua cart */
function clearCart() {
  cart.forEach(c => updateMenuCardQty(c.id, 0));
  cart = [];
  renderCart();
  updateCartBadge();
  updateCheckoutSummary();
}

/* ===== BOOKING CART ===== */
function addToBookingCart(menuId, qty = 1) {
  const item = getMenuById(menuId);
  if (!item) return;
  const existing = bookingCart.find(c => c.id === menuId);
  if (existing) {
    existing.qty += qty;
  } else {
    bookingCart.push({ id: item.id, name: item.name, price: item.price, qty, emoji: item.emoji });
  }
  updateBookingSummary();
}

function setBookingCartQty(menuId, qty) {
  if (qty <= 0) {
    bookingCart = bookingCart.filter(c => c.id !== menuId);
  } else {
    const existing = bookingCart.find(c => c.id === menuId);
    if (existing) existing.qty = qty;
    else bookingCart.push({ id: getMenuById(menuId), qty });
  }
  updateBookingSummary();
}

function getBookingCartTotal() {
  return bookingCart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

/* ===== CART TOTALS ===== */
function getCartSubtotal() {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function getCartItemCount() {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

/* ===== RENDER CART ===== */
function renderCart() {
  const cartEmpty   = document.getElementById('cartEmpty');
  const cartItems   = document.getElementById('cartItems');
  const cartList    = document.getElementById('cartList');

  if (!cartList) return;

  if (cart.length === 0) {
    cartEmpty.style.display  = 'flex';
    cartItems.style.display  = 'none';
    updateCheckoutSummary();
    return;
  }

  cartEmpty.style.display = 'none';
  cartItems.style.display = 'block';

  cartList.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatRupiah(item.price)} × ${item.qty}</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="cartQtyChange('${item.id}', -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="cartQtyChange('${item.id}', 1)">+</button>
      </div>
      <div class="cart-item-subtotal">${formatRupiah(item.price * item.qty)}</div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Hapus">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');

  updateCheckoutSummary();
}

function cartQtyChange(menuId, delta) {
  const item = cart.find(c => c.id === menuId);
  if (!item) return;
  const newQty = item.qty + delta;
  setCartQty(menuId, newQty);
  // sync dengan menu card
  updateMenuCardQty(menuId, newQty > 0 ? newQty : 0);
}

/* ===== BADGE ===== */
function updateCartBadge() {
  const count = getCartItemCount();
  const badges = [
    document.getElementById('cartBadge'),
    document.getElementById('floatCartBadge'),
  ];
  badges.forEach(b => { if (b) b.textContent = count; });
  // Tampilkan float cart jika ada item
  const floatCart = document.getElementById('floatCart');
  if (floatCart) {
    floatCart.style.display = count > 0 ? 'block' : 'none';
  }
}

/* ===== TOAST ===== */
function showToast(msg) {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

/* ===== SYNC MENU CARD QTY ===== */
function updateMenuCardQty(menuId, qty) {
  // Update semua qty display di halaman (bisa ada di menu utama & booking)
  document.querySelectorAll(`[data-menu-id="${menuId}"] .qty-value`).forEach(el => {
    el.textContent = qty;
  });
  document.querySelectorAll(`[data-menu-id="${menuId}"] .qty-control`).forEach(el => {
    el.style.display = qty > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll(`[data-menu-id="${menuId}"] .add-to-cart-btn`).forEach(el => {
    el.style.display = qty > 0 ? 'none' : 'flex';
  });
}

/* ===== CHECKOUT SUMMARY UPDATE ===== */
function updateCheckoutSummary() {
  const method    = document.querySelector('.method-btn.active')?.dataset.method || 'delivery';
  const areaId    = document.getElementById('selectArea')?.value || '';
  const area      = DELIVERY_AREAS.find(a => a.id === areaId);
  const ongkir    = (method === 'delivery' && area) ? area.ongkir : 0;
  const subtotal  = getCartSubtotal();
  const total     = subtotal + ongkir;

  const el = (id) => document.getElementById(id);
  if (el('summarySubtotal')) el('summarySubtotal').textContent = formatRupiah(subtotal);
  if (el('summaryOngkir'))   el('summaryOngkir').textContent   = ongkir === 0 ? 'Gratis' : formatRupiah(ongkir);
  if (el('summaryTotal'))    el('summaryTotal').textContent    = formatRupiah(total);
}

/* ===== BOOKING SUMMARY UPDATE ===== */
function updateBookingSummary() {
  const total   = getBookingCartTotal();
  const summary = document.getElementById('bookingSummary');
  const totalEl = document.getElementById('bookingTotal');
  if (!summary || !totalEl) return;
  summary.style.display = bookingCart.length > 0 ? 'block' : 'none';
  totalEl.textContent = formatRupiah(total);
}
