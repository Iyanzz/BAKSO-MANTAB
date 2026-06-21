/**
 * booking.js — Form Booking Meja + WhatsApp redirect
 * Bakso Mantap Jaya
 */

function initBooking() {
  // Toggle section estimasi menu
  const toggleBtn     = document.getElementById('toggleBookingMenu');
  const menuSection   = document.getElementById('bookingMenuSection');
  const toggleIcon    = document.getElementById('toggleMenuIcon');

  toggleBtn?.addEventListener('click', () => {
    const isOpen = menuSection.style.display !== 'none';
    menuSection.style.display = isOpen ? 'none' : 'block';
    toggleIcon.className = isOpen
      ? 'fas fa-chevron-down'
      : 'fas fa-chevron-up';

    if (!isOpen) {
      renderBookingMenuGrid('makanan');
      // Reset tab active
      document.querySelectorAll('#bookingMenuTabs .tab-btn').forEach((b, i) => {
        b.classList.toggle('active', i === 0);
      });
    }
  });

  // Set tanggal minimum = hari ini
  const bookDate = document.getElementById('bookDate');
  if (bookDate) {
    const today = new Date().toISOString().split('T')[0];
    bookDate.min = today;
    bookDate.value = today;
  }

  // Jam default
  const bookTime = document.getElementById('bookTime');
  if (bookTime) {
    const now    = new Date();
    const hh     = String(now.getHours()).padStart(2, '0');
    const mm     = String(Math.ceil(now.getMinutes() / 15) * 15 % 60).padStart(2, '0');
    bookTime.value = `${hh}:${mm}`;
  }

  // Tombol booking WA
  document.getElementById('btnBookingWA')?.addEventListener('click', sendBookingWhatsApp);
}

function validateBooking() {
  const name    = document.getElementById('bookName')?.value.trim();
  const phone   = document.getElementById('bookPhone')?.value.trim();
  const date    = document.getElementById('bookDate')?.value;
  const time    = document.getElementById('bookTime')?.value;
  const people  = document.getElementById('bookPeople')?.value;

  if (!name)   { alert('Mohon masukkan nama Anda.'); document.getElementById('bookName').focus(); return false; }
  if (!phone)  { alert('Mohon masukkan nomor HP/WhatsApp.'); document.getElementById('bookPhone').focus(); return false; }
  if (!date)   { alert('Mohon pilih tanggal booking.'); document.getElementById('bookDate').focus(); return false; }
  if (!time)   { alert('Mohon pilih jam booking.'); document.getElementById('bookTime').focus(); return false; }
  if (!people) { alert('Mohon pilih jumlah orang.'); document.getElementById('bookPeople').focus(); return false; }
  return true;
}

function buildBookingMessage() {
  const name    = document.getElementById('bookName')?.value.trim();
  const phone   = document.getElementById('bookPhone')?.value.trim();
  const dateVal = document.getElementById('bookDate')?.value;
  const time    = document.getElementById('bookTime')?.value;
  const people  = document.getElementById('bookPeople')?.value;
  const note    = document.getElementById('bookNote')?.value.trim();

  // Format tanggal → dd/mm/yyyy
  const dateParts = dateVal.split('-');
  const dateFormatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  // Estimasi menu booking
  let menuLines = '';
  let totalEst  = 0;
  if (bookingCart.length > 0) {
    menuLines = '\n\nEstimasi pesanan (opsional):\n';
    bookingCart.forEach(item => {
      const sub = item.price * item.qty;
      totalEst += sub;
      menuLines += `- ${item.name} ×${item.qty} = ${formatRupiah(sub)}\n`;
    });
    menuLines += `\nTotal estimasi: ${formatRupiah(totalEst)}`;
  }

  const msg = `Halo ${BUSINESS_CONFIG.name}, saya ingin booking meja:
Nama: ${name}
No. HP: ${phone}
Tanggal: ${dateFormatted}
Jam: ${time}
Jumlah orang: ${people}${menuLines}
${note ? `\nCatatan: ${note}` : ''}
Mohon konfirmasi ketersediaan meja. Terima kasih.`;

  return msg;
}

function sendBookingWhatsApp() {
  if (!validateBooking()) return;
  const msg = buildBookingMessage();
  const url = `https://wa.me/${BUSINESS_CONFIG.wa_number}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
