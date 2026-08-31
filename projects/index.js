// projects/index.js
// Injects project cards into #projects-grid and opens demo modals on click.

const projects = [
  {
    id: 'home-lab-server',
    icon: '🖥️',
    title: 'Home Lab Server',
    badge: 'Personal Project',
    desc: 'Repurposed an old desktop into a Windows home server running a Docker-based service stack — file sharing, media streaming, network-wide ad blocking, and secure remote access — all self-deployed, configured, and documented from scratch.',
    tags: ['Docker', 'Windows', 'Plex', 'Pi-hole', 'VPN'],
    images: [
      { src: 'projects/images/pihole-dashboard.png', caption: 'Pi-hole dashboard — network-wide DNS ad blocking, 79K+ domains on lists, live query monitoring.' },
      { src: 'projects/images/tailscale-machines.png', caption: 'Tailscale VPN — secure remote access into the home network from any connected device.' },
    ],
    featured: true,
  },
  {
    id: 'knight-market',
    icon: '🛒',
    title: 'Knight Market',
    badge: 'Group Project',
    desc: 'A full-stack MERN marketplace app built for UCF students — browse, list, and manage campus goods with user authentication and a React frontend.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    externalUrl: 'https://github.com/timnguyen-tofu/CIS4004-Group25Project/tree/main/MERN%20Stack%20Project',
    featured: true,
  },
  {
    id: 'expense-tracker',
    icon: '💸',
    title: 'Expense Tracker',
    badge: null,
    desc: 'A browser-based tool to log and categorize expenses, track spending over time, and view a running total.',
    tags: ['JavaScript', 'DOM', 'LocalStorage'],
    demoUrl: 'expense-tracker.html',
  },
  {
    id: 'grade-calculator',
    icon: '📊',
    title: 'Grade Calculator',
    badge: null,
    desc: 'Enter assignment scores and weights to instantly calculate your weighted course grade and letter grade.',
    tags: ['JavaScript', 'DOM', 'Math'],
    demoUrl: 'grade-calculator.html',
  },
  {
    id: 'contact-book',
    icon: '📒',
    title: 'Contact Book',
    badge: null,
    desc: 'A contact management app to add, search, edit, and delete contacts — all stored in the browser.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    demoUrl: 'contact-book.html',
  },
];

// ── Build cards ────────────────────────────────────────────────────────────────

const grid = document.getElementById('projects-grid');

projects.forEach(p => {
  const card = document.createElement('div');
  card.className = p.featured ? 'project-card featured' : 'project-card';
  card.style.cursor = 'pointer';

  const linkLabel = p.externalUrl ? 'View on GitHub →' : (p.images ? 'View Screenshots →' : 'View Demo →');
  const titleClass = p.featured ? 'project-title featured-title' : 'project-title';

  card.innerHTML = `
    <div class="project-icon">${p.icon}</div>
    <div class="project-header">
      <span class="${titleClass}">${p.title}${p.badge ? `<span class="project-badge">${p.badge}</span>` : ''}</span>
      <span class="project-link-label">${linkLabel}</span>
    </div>
    <p class="project-desc">${p.desc}</p>
    <div class="project-tags">
      ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
  `;

  if (p.externalUrl) {
    card.addEventListener('click', () => window.open(p.externalUrl, '_blank', 'noopener'));
  } else if (p.images) {
    card.addEventListener('click', () => openGallery(p));
  } else {
    card.addEventListener('click', () => openModal(p));
  }

  grid.appendChild(card);
});

// ── Modal ──────────────────────────────────────────────────────────────────────

// Inject modal styles once
const style = document.createElement('style');
style.textContent = `
  .demo-overlay {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(13,27,42,0.88);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

  .demo-modal {
    position: relative;
    width: 100%; max-width: 900px;
    height: 85vh;
    background: #0D1B2A;
    border: 1px solid rgba(244,162,97,0.3);
    border-radius: 12px;
    display: flex; flex-direction: column;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  }

  .demo-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.85rem 1.25rem;
    background: #112236;
    border-bottom: 1px solid rgba(244,162,97,0.12);
    flex-shrink: 0;
  }

  .demo-modal-title {
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    color: #F0F4F8;
  }

  .demo-modal-actions {
    display: flex; align-items: center; gap: 0.75rem;
  }

  .demo-open-btn {
    font-size: 0.78rem;
    font-weight: 600;
    color: #F4A261;
    background: rgba(244,162,97,0.1);
    border: 1px solid rgba(244,162,97,0.3);
    border-radius: 5px;
    padding: 0.3rem 0.8rem;
    cursor: pointer;
    text-decoration: none;
    letter-spacing: 0.03em;
    transition: background 0.2s;
  }
  .demo-open-btn:hover { background: rgba(244,162,97,0.2); }

  .demo-close-btn {
    background: none; border: none;
    color: #8BA3BA; font-size: 1.4rem; line-height: 1;
    cursor: pointer; padding: 0.1rem 0.3rem;
    transition: color 0.2s;
  }
  .demo-close-btn:hover { color: #F4A261; }

  .demo-iframe {
    flex: 1; border: none; width: 100%;
    background: #fff;
  }

  .gallery-body {
    flex: 1;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 1.5rem;
    overflow: auto;
    gap: 1rem;
  }

  .gallery-img-wrap {
    position: relative;
    width: 100%;
    display: flex; align-items: center; justify-content: center;
  }

  .gallery-img {
    max-width: 100%; max-height: 60vh;
    border-radius: 8px;
    border: 1px solid rgba(244,162,97,0.2);
    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  }

  .gallery-nav-btn {
    background: rgba(22,35,55,0.9);
    border: 1px solid rgba(244,162,97,0.3);
    color: #F4A261;
    width: 36px; height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.1rem;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .gallery-nav-btn:hover { background: rgba(244,162,97,0.2); }
  .gallery-nav-btn:disabled { opacity: 0.3; cursor: default; }

  .gallery-controls {
    display: flex; align-items: center; gap: 1rem;
  }

  .gallery-caption {
    font-size: 0.85rem;
    color: #8BA3BA;
    text-align: center;
    max-width: 600px;
  }

  .gallery-dots {
    display: flex; gap: 0.4rem;
  }
  .gallery-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: rgba(240,244,248,0.25);
    cursor: pointer;
    transition: background 0.2s;
  }
  .gallery-dot.active { background: #F4A261; }
`;
document.head.appendChild(style);

function openModal(project) {
  // Remove any existing modal
  closeModal();

  const overlay = document.createElement('div');
  overlay.className = 'demo-overlay';
  overlay.id = 'demo-overlay';

  overlay.innerHTML = `
    <div class="demo-modal">
      <div class="demo-modal-header">
        <span class="demo-modal-title">${project.icon} ${project.title}</span>
        <div class="demo-modal-actions">
          <a class="demo-open-btn" href="${project.demoUrl}" target="_blank" rel="noopener">Open in new tab ↗</a>
          <button class="demo-close-btn" id="demo-close-btn" aria-label="Close">✕</button>
        </div>
      </div>
      <iframe class="demo-iframe" src="${project.demoUrl}" title="${project.title} demo"></iframe>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  document.getElementById('demo-close-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', escClose);
}

function closeModal() {
  const existing = document.getElementById('demo-overlay');
  if (existing) existing.remove();
  document.body.style.overflow = '';
  document.removeEventListener('keydown', escClose);
  if (currentGalleryNav) {
    document.removeEventListener('keydown', currentGalleryNav);
    currentGalleryNav = null;
  }
}

function escClose(e) {
  if (e.key === 'Escape') closeModal();
}

let currentGalleryNav = null;

// ── Screenshot gallery ───────────────────────────────────────────────────────

function openGallery(project) {
  closeModal();

  let index = 0;
  const images = project.images;

  const overlay = document.createElement('div');
  overlay.className = 'demo-overlay';
  overlay.id = 'demo-overlay';

  overlay.innerHTML = `
    <div class="demo-modal" style="height: auto; max-height: 85vh;">
      <div class="demo-modal-header">
        <span class="demo-modal-title">${project.icon} ${project.title}</span>
        <div class="demo-modal-actions">
          <button class="demo-close-btn" id="demo-close-btn" aria-label="Close">✕</button>
        </div>
      </div>
      <div class="gallery-body">
        <div class="gallery-img-wrap">
          <img class="gallery-img" id="gallery-img" src="${images[0].src}" alt="${project.title} screenshot 1" />
        </div>
        <p class="gallery-caption" id="gallery-caption">${images[0].caption || ''}</p>
        <div class="gallery-controls">
          <button class="gallery-nav-btn" id="gallery-prev" aria-label="Previous">←</button>
          <div class="gallery-dots" id="gallery-dots">
            ${images.map((_, i) => `<span class="gallery-dot${i === 0 ? ' active' : ''}" data-i="${i}"></span>`).join('')}
          </div>
          <button class="gallery-nav-btn" id="gallery-next" aria-label="Next">→</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const imgEl = document.getElementById('gallery-img');
  const captionEl = document.getElementById('gallery-caption');
  const dots = overlay.querySelectorAll('.gallery-dot');

  function render() {
    imgEl.src = images[index].src;
    imgEl.alt = `${project.title} screenshot ${index + 1}`;
    captionEl.textContent = images[index].caption || '';
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  document.getElementById('gallery-prev').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    render();
  });
  document.getElementById('gallery-next').addEventListener('click', () => {
    index = (index + 1) % images.length;
    render();
  });
  dots.forEach(d => d.addEventListener('click', () => {
    index = parseInt(d.dataset.i, 10);
    render();
  }));

  document.getElementById('demo-close-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', escClose);

  currentGalleryNav = function (e) {
    if (e.key === 'ArrowLeft') document.getElementById('gallery-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('gallery-next').click();
  };
  document.addEventListener('keydown', currentGalleryNav);
}
