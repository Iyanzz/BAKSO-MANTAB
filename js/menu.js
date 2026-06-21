/**
 * menu.js — Render grid menu utama & menu booking
 * Bakso Mantap Jaya
 */

let activeMenuCat    = 'makanan';
let activeBookingCat = 'makanan';

/* ===== RENDER MENU UTAMA ===== */
function renderMenuGrid(category) {
  activeMenuCat = category;
  const grid  = document.getElementById('menuGrid');
  if (!grid) return;

  const items = MENU_DATA[category] || [];
  grid.innerHTML = items.map(item => buildMenuCard(item, 'main')).join('');

  // Sync qty dari cart
  cart.forEach(c => {
    updateMenuCardQty(c.id, c.qty);
  });
}

/* ===== RENDER MENU BOOKING ===== */
function renderBookingMenuGrid(category) {
  activeBookingCat = category;
  const grid = document.getElementById('bookingMenuGrid');
  if (!grid) return;

  const items = MENU_DATA[category] || [];
  grid.innerHTML = items.map(item => buildMenuCard(item, 'booking')).join('');

  // Sync qty dari bookingCart
  bookingCart.forEach(c => {
    updateBookingCardQty(c.id, c.qty);
  });
}

/* ===== BUILD MENU CARD HTML ===== */
function buildMenuCard(item, mode) {
  const isBooking = mode === 'booking';
  const addFn     = isBooking ? `addToBookingFromCard('${item.id}')` : `addToCartFromCard('${item.id}')`;
  const incFn     = isBooking ? `bookingQtyInc('${item.id}')` : `mainQtyInc('${item.id}')`;
  const decFn     = isBooking ? `bookingQtyDec('${item.id}')` : `mainQtyDec('${item.id}')`;
  const prefix    = isBooking ? 'b' : 'm';

  return `
    <div class="menu-card" data-menu-id="${item.id}" data-mode="${mode}">
      <div class="menu-card-img-placeholder">
        <span style="font-size:2.8rem">${item.emoji}</span>
        <span>Foto menyusul</span>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        ${item.note ? `<div class="menu-card-note">${item.note}</div>` : ''}
      </div>
      <div class="menu-card-footer">
        <span class="menu-card-price">${formatRupiah(item.price)}</span>
        <div style="display:flex;align-items:center;gap:.35rem">
          <!-- qty control (tersembunyi jika qty=0) -->
          <div class="qty-control" id="${prefix}-qty-ctrl-${item.id}" style="display:none;">
            <button class="qty-btn" onclick="${decFn}">−</button>
            <span class="qty-value" id="${prefix}-qty-val-${item.id}">0</span>
            <button class="qty-btn" onclick="${incFn}">+</button>
          </div>
          <!-- tombol tambah -->
          <button class="add-to-cart-btn" id="${prefix}-add-btn-${item.id}" onclick="${addFn}" title="Tambah ke keranjang">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ===== MAIN MENU CART ACTIONS ===== */
function addToCartFromCard(menuId) {
  addToCart(menuId, 1);
  syncMainCardQty(menuId);
}
function mainQtyInc(menuId) {
  const item = cart.find(c => c.id === menuId);
  const newQty = (item ? item.qty : 0) + 1;
  setCartQty(menuId, newQty);
  syncMainCardQty(menuId);
}
function mainQtyDec(menuId) {
  const item = cart.find(c => c.id === menuId);
  if (!item) return;
  const newQty = item.qty - 1;
  setCartQty(menuId, newQty);
  syncMainCardQty(menuId);
}
function syncMainCardQty(menuId) {
  const item   = cart.find(c => c.id === menuId);
  const qty    = item ? item.qty : 0;
  const ctrl   = document.getElementById(`m-qty-ctrl-${menuId}`);
  const val    = document.getElementById(`m-qty-val-${menuId}`);
  const addBtn = document.getElementById(`m-add-btn-${menuId}`);
  if (ctrl)   ctrl.style.display   = qty > 0 ? 'flex' : 'none';
  if (addBtn) addBtn.style.display  = qty > 0 ? 'none' : 'flex';
  if (val)    val.textContent       = qty;
}

/* ===== BOOKING MENU CART ACTIONS ===== */
function addToBookingFromCard(menuId) {
  addToBookingCart(menuId, 1);
  syncBookingCardQty(menuId);
}
function bookingQtyInc(menuId) {
  const item = bookingCart.find(c => c.id === menuId);
  const newQty = (item ? item.qty : 0) + 1;
  setBookingCartQty(menuId, newQty);
  syncBookingCardQty(menuId);
}
function bookingQtyDec(menuId) {
  const item = bookingCart.find(c => c.id === menuId);
  if (!item) return;
  const newQty = item.qty - 1;
  setBookingCartQty(menuId, newQty);
  syncBookingCardQty(menuId);
}
function syncBookingCardQty(menuId) {
  const item   = bookingCart.find(c => c.id === menuId);
  const qty    = item ? item.qty : 0;
  const ctrl   = document.getElementById(`b-qty-ctrl-${menuId}`);
  const val    = document.getElementById(`b-qty-val-${menuId}`);
  const addBtn = document.getElementById(`b-add-btn-${menuId}`);
  if (ctrl)   ctrl.style.display   = qty > 0 ? 'flex' : 'none';
  if (addBtn) addBtn.style.display  = qty > 0 ? 'none' : 'flex';
  if (val)    val.textContent       = qty;
}

/* ===== BOOKING CART setQty override ===== */
function setBookingCartQty(menuId, qty) {
  if (qty <= 0) {
    bookingCart = bookingCart.filter(c => c.id !== menuId);
  } else {
    const existing = bookingCart.find(c => c.id === menuId);
    if (existing) {
      existing.qty = qty;
    } else {
      const item = getMenuById(menuId);
      if (item) bookingCart.push({ id: item.id, name: item.name, price: item.price, qty, emoji: item.emoji });
    }
  }
  updateBookingSummary();
}

/* ===== INIT MENU TABS ===== */
function initMenuTabs() {
  // Menu utama
  const tabs = document.querySelectorAll('#menuTabs .tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderMenuGrid(btn.dataset.cat);
    });
  });
  renderMenuGrid('makanan');

  // Menu booking
  const btabs = document.querySelectorAll('#bookingMenuTabs .tab-btn');
  btabs.forEach(btn => {
    btn.addEventListener('click', () => {
      btabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderBookingMenuGrid(btn.dataset.bcat);
    });
  });
}
