/**
 * checkout.js — Checkout order delivery/pickup + WhatsApp redirect
 * Bakso Mantap Jaya
 */

let currentMethod = 'delivery';  // 'delivery' | 'pickup'

function initCheckout() {
  // Populate dropdown area
  populateAreaSelect();

  // Render tabel area delivery
  renderAreaTable();

  // Method toggle
  document.getElementById('btnDelivery')?.addEventListener('click', () => setMethod('delivery'));
  document.getElementById('btnPickup')?.addEventListener('click',  () => setMethod('pickup'));

  // Area select change
  document.getElementById('selectArea')?.addEventListener('change', onAreaChange);

  // Clear cart
  document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    if (confirm('Yakin ingin mengosongkan keranjang?')) clearCart();
  });

  // Kirim via WA
  document.getElementById('btnOrderWA')?.addEventListener('click', sendOrderWhatsApp);
}

/* ===== POPULATE DROPDOWN AREA ===== */
function populateAreaSelect() {
  const sel = document.getElementById('selectArea');
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Pilih RT/RW Anda --</option>';
  DELIVERY_AREAS.forEach(area => {
    sel.innerHTML += `<option value="${area.id}">${area.label} — ${formatRupiah(area.ongkir)}</option>`;
  });
  // Tambahkan opsi "di luar daftar"
  sel.innerHTML += `<option value="luar">Di luar daftar / tidak tahu</option>`;
}

/* ===== RENDER TABEL AREA DELIVERY ===== */
function renderAreaTable() {
  const tbody = document.getElementById('areaTableBody');
  if (!tbody) return;
  tbody.innerHTML = DELIVERY_AREAS.map(area => `
    <tr>
      <td><strong>${area.label}</strong></td>
      <td><strong>${formatRupiah(area.ongkir)}</strong></td>
      <td><span class="badge-active"><i class="fas fa-check-circle"></i> Dilayani</span></td>
    </tr>
  `).join('');
}

/* ===== SET METODE ===== */
function setMethod(method) {
  currentMethod = method;

  document.getElementById('btnDelivery').classList.toggle('active', method === 'delivery');
  document.getElementById('btnPickup').classList.toggle('active',   method === 'pickup');

  document.getElementById('deliveryAreaGroup').style.display = method === 'delivery' ? 'flex' : 'none';
  document.getElementById('pickupInfo').style.display         = method === 'pickup'   ? 'block' : 'none';
  document.getElementById('addressGroup').style.display       = method === 'delivery' ? 'flex' : 'none';

  // Reset ongkir info
  document.getElementById('ongkirInfo').style.display    = 'none';
  document.getElementById('areaNotFound').style.display  = 'none';

  updateCheckoutSummary();
}

/* ===== ON AREA CHANGE ===== */
function onAreaChange() {
  const val     = document.getElementById('selectArea').value;
  const area    = DELIVERY_AREAS.find(a => a.id === val);
  const infoEl  = document.getElementById('ongkirInfo');
  const notFound = document.getElementById('areaNotFound');

  if (!val) {
    infoEl.style.display   = 'none';
    notFound.style.display = 'none';
  } else if (val === 'luar') {
    infoEl.style.display   = 'none';
    notFound.style.display = 'flex';
  } else if (area) {
    document.getElementById('ongkirArea').textContent  = area.label;
    document.getElementById('ongkirPrice').textContent = formatRupiah(area.ongkir);
    infoEl.style.display   = 'flex';
    notFound.style.display = 'none';
  }
  updateCheckoutSummary();
}

/* ===== VALIDATE ORDER ===== */
function validateOrder() {
  if (cart.length === 0) {
    alert('Keranjangmu kosong! Silakan pilih menu terlebih dahulu.');
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    return false;
  }
  const name  = document.getElementById('orderName')?.value.trim();
  const phone = document.getElementById('orderPhone')?.value.trim();
  if (!name)  { alert('Mohon masukkan nama pemesan.'); document.getElementById('orderName').focus(); return false; }
  if (!phone) { alert('Mohon masukkan nomor HP/WhatsApp.'); document.getElementById('orderPhone').focus(); return false; }

  if (currentMethod === 'delivery') {
    const areaVal = document.getElementById('selectArea')?.value;
    if (!areaVal) {
      alert('Mohon pilih area RT/RW tujuan pengiriman.');
      document.getElementById('selectArea').focus();
      return false;
    }
    if (areaVal === 'luar') {
      alert('Area Anda di luar jangkauan delivery kami. Silakan hubungi toko langsung.');
      return false;
    }
    const addr = document.getElementById('orderAddress')?.value.trim();
    if (!addr) { alert('Mohon masukkan alamat lengkap.'); document.getElementById('orderAddress').focus(); return false; }
  }
  return true;
}

/* ===== BUILD ORDER MESSAGE ===== */
function buildOrderMessage() {
  const name    = document.getElementById('orderName')?.value.trim();
  const phone   = document.getElementById('orderPhone')?.value.trim();
  const address = document.getElementById('orderAddress')?.value.trim();
  const note    = document.getElementById('orderNote')?.value.trim();
  const areaVal = document.getElementById('selectArea')?.value;
  const area    = DELIVERY_AREAS.find(a => a.id === areaVal);
  const ongkir  = (currentMethod === 'delivery' && area) ? area.ongkir : 0;
  const subtotal = getCartSubtotal();
  const total    = subtotal + ongkir;

  // Baris item
  const itemLines = cart.map(item =>
    `- ${item.name} ×${item.qty} = ${formatRupiah(item.price * item.qty)}`
  ).join('\n');

  // Baris delivery
  const deliveryLine = currentMethod === 'delivery'
    ? `\nRT/RW: ${area?.label || '-'}\nAlamat: ${address}`
    : '';

  const msg = `Halo ${BUSINESS_CONFIG.name}, saya ingin pesan:

Pesanan:
${itemLines}

Metode: ${currentMethod === 'delivery' ? 'Delivery' : 'Ambil di Toko (Pickup)'}${deliveryLine}
Nama: ${name}
No. HP: ${phone}
${note ? `Catatan: ${note}\n` : ''}
Subtotal: ${formatRupiah(subtotal)}
Ongkir: ${ongkir === 0 ? 'Gratis' : formatRupiah(ongkir)}
Total: ${formatRupiah(total)}

Mohon konfirmasi pesanan saya. Terima kasih.`;

  return msg;
}

/* ===== SEND VIA WHATSAPP ===== */
function sendOrderWhatsApp() {
  if (!validateOrder()) return;
  const msg = buildOrderMessage();
  const url = `https://wa.me/${BUSINESS_CONFIG.wa_number}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
