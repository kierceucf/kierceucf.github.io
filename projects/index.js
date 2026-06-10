// projects/index.js
// Injects project cards into #projects-grid and opens demo modals on click.

const projects = [
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
  card.className = 'project-card';
  card.style.cursor = 'pointer';

  card.innerHTML = `
    <div class="project-icon">${p.icon}</div>
    <div class="project-header">
      <span class="project-title">${p.title}${p.badge ? `<span class="project-badge">${p.badge}</span>` : ''}</span>
      <span class="project-link-label">View Demo →</span>
    </div>
    <p class="project-desc">${p.desc}</p>
    <div class="project-tags">
      ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
  `;

  card.addEventListener('click', () => openModal(p));
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
}

function escClose(e) {
  if (e.key === 'Escape') closeModal();
}
