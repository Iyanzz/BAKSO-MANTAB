/**
 * gallery.js — Galeri Interior + Lightbox
 * Bakso Mantap Jaya
 */

let lightboxIndex = 0;

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = GALLERY_DATA.map((item, idx) => `
    <div class="gallery-item" data-index="${idx}" onclick="openLightbox(${idx})">
      <img
        src="${item.url}"
        alt="${item.alt}"
        loading="lazy"
        onerror="this.parentElement.innerHTML='<div class=gallery-card-fallback>📷 Foto Segera Hadir</div>'"
      />
      <div class="gallery-overlay">
        <span>${item.caption}</span>
      </div>
      <div class="gallery-zoom"><i class="fas fa-search-plus"></i></div>
    </div>
  `).join('');
}

function openLightbox(index) {
  lightboxIndex = index;
  updateLightboxContent();
  document.getElementById('lightbox').classList.add('active');
  document.getElementById('lightboxBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.getElementById('lightboxBackdrop').classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % GALLERY_DATA.length;
  updateLightboxContent();
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item    = GALLERY_DATA[lightboxIndex];
  const img     = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  if (img) {
    img.src = item.url;
    img.alt = item.alt;
  }
  if (caption) caption.textContent = `${item.caption} (${lightboxIndex + 1}/${GALLERY_DATA.length})`;
}

function initGalleryEvents() {
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext')?.addEventListener('click', lightboxNext);
  document.getElementById('lightboxPrev')?.addEventListener('click', lightboxPrev);
  document.getElementById('lightboxBackdrop')?.addEventListener('click', closeLightbox);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb?.classList.contains('active')) return;
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft')  lightboxPrev();
    if (e.key === 'Escape')     closeLightbox();
  });
}
