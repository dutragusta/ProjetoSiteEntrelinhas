/**
 * ENTRELINHAS - Aplicação Principal Consolidada
 * SPA com navegação hash, estado global, componentes interativos
 * Arquivo único para deploy simples no GitHub Pages
 */

// ============================================================================
// DESIGN TOKENS / CONSTANTES
// ============================================================================
const CATEGORIES = {
  ficcao: 'Ficção', drama: 'Drama', distopia: 'Distopia', romance: 'Romance', fantasia: 'Fantasia'
};
const STATUS_LABELS = { completo: 'Completo', andamento: 'Em andamento', 'nao-iniciado': 'Não iniciado' };
const STATUS_BADGE_CLASSES = { completo: 'status-badge--completo', andamento: 'status-badge--andamento', 'nao-iniciado': 'status-badge--nao-iniciado' };

const INITIAL_BOOKS = [
  { id: 1, title: '1984', author: 'George Orwell', category: 'distopia', year: 1949, synopsis: 'Um romance distópico que descreve um estado totalitário onde o "Grande Irmão" vigia todos os cidadãos. Winston Smith trabalha no Ministério da Verdade alterando registros históricos, mas começa a questionar o sistema.', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', rating: 4.8, tags: ['clássico', 'política', 'vigilância'], createdAt: '2024-01-15' },
  { id: 2, title: 'Dom Casmurro', author: 'Machado de Assis', category: 'romance', year: 1899, synopsis: 'Bentinho narra sua vida e seu ciúme em relação a Capitu, em uma narrativa que brinca com a memória e a confiabilidade do narrador. Um dos maiores clássicos da literatura brasileira.', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop', rating: 4.7, tags: ['clássico brasileiro', 'ciúme', 'narrativa não-linear'], createdAt: '2024-01-20' },
  { id: 3, title: 'O Senhor dos Anéis: A Sociedade do Anel', author: 'J.R.R. Tolkien', category: 'fantasia', year: 1954, synopsis: 'Frodo Bolseiro herda o Um Anel e deve destruí-lo no Monte da Perdição. A primeira parte da trilogia épica que definiu a fantasia moderna.', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002f7e3?w=300&h=450&fit=crop', rating: 4.9, tags: ['épico', 'aventura', 'terra-média'], createdAt: '2024-02-01' },
  { id: 4, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', category: 'ficcao', year: 1967, synopsis: 'A história da família Buendía ao longo de sete gerações em Macondo, misturando realismo mágico com a história da Colômbia. Obra-prima do realismo mágico.', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop', rating: 4.6, tags: ['realismo mágico', 'família', 'colômbia'], createdAt: '2024-02-10' },
  { id: 5, title: 'O Apanhador no Campo de Centeio', author: 'J.D. Salinger', category: 'drama', year: 1951, synopsis: 'Holden Caulfield, um adolescente expulso da escola, vaga por Nova York em um fim de semana, refletindo sobre a hipocrisia do mundo adulto e a perda da inocência.', cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=450&fit=crop', rating: 4.3, tags: ['adolescência', 'alienação', 'clássico moderno'], createdAt: '2024-02-15' },
  { id: 6, title: 'A Revolução dos Bichos', author: 'George Orwell', category: 'ficcao', year: 1945, synopsis: 'Uma fábula satírica sobre animais que se rebelam contra o fazendeiro humano, apenas para criar uma nova tirania. Crítica alegórica ao totalitarismo.', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop', rating: 4.5, tags: ['alegoria', 'política', 'sátira'], createdAt: '2024-02-20' },
  { id: 7, title: 'Orgulho e Preconceito', author: 'Jane Austen', category: 'romance', year: 1813, synopsis: 'Elizabeth Bennet navega pelas convenções sociais da Inglaterra do século XIX, enquanto seu relacionamento com o orgulhoso Sr. Darcy evolui de antipatia para amor.', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop', rating: 4.7, tags: ['romance de época', 'sociedade', 'ironia'], createdAt: '2024-03-01' },
  { id: 8, title: 'O Hobbit', author: 'J.R.R. Tolkien', category: 'fantasia', year: 1937, synopsis: 'Bilbo Bolseiro, um hobbit pacato, é arrastado para uma aventura com treze anões e o mago Gandalf para recuperar um tesouro guardado pelo dragão Smaug.', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop', rating: 4.8, tags: ['aventura', 'pré-sequência', 'terra-média'], createdAt: '2024-03-05' },
  { id: 9, title: 'Fahrenheit 451', author: 'Ray Bradbury', category: 'distopia', year: 1953, synopsis: 'Em um futuro onde livros são proibidos e queimados, o bombeiro Guy Montag começa a questionar seu papel e a sociedade que o cerca.', cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=450&fit=crop', rating: 4.6, tags: ['censura', 'tecnologia', 'resistência'], createdAt: '2024-03-10' },
  { id: 10, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', category: 'ficcao', year: 1943, synopsis: 'Um piloto perdido no deserto encontra um pequeno príncipe vindo de outro planeta, que lhe ensina sobre o essencial ser invisível aos olhos.', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop', rating: 4.9, tags: ['filosofia', 'infância', 'essencial'], createdAt: '2024-03-15' }
];

// ============================================================================
// ESTADO GLOBAL
// ============================================================================
const AppState = {
  user: null, books: [], userShelf: [],
  filters: { search: '', category: '', status: '' },
  viewMode: 'grid', currentScreen: 'home', carouselPosition: 0
};

// ============================================================================
// UTILITÁRIOS
// ============================================================================
const Utils = {
  generateId() { return Date.now() + Math.random().toString(36).substr(2, 9); },
  formatDate(dateString) { return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }); },
  debounce(fn, delay) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), delay); }; },
  escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; },
  truncate(text, max) { return text.length <= max ? text : text.substr(0, max).trim() + '...'; },
  getInitials(name) { return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2); },
  calculateProgress(cur, total) { return total ? Math.min(100, Math.round((cur / total) * 100)) : 0; },
  createStars(rating, max = 5, size = 16) {
    const full = Math.floor(rating), half = rating % 1 >= 0.5, empty = max - full - (half ? 1 : 0);
    let html = '';
    for (let i = 0; i < full; i++) html += `<svg class="book-card__star filled" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.26-1.57L12 2z"/></svg>`;
    if (half) html += `<svg class="book-card__star half" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.26-1.57L12 2z"/></svg>`;
    for (let i = 0; i < empty; i++) html += `<svg class="book-card__star" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.26-1.57L12 2z"/></svg>`;
    return html;
  },
  save(key, data) { try { localStorage.setItem(`entrelinhas_${key}`, JSON.stringify(data)); return true; } catch (e) { console.error(e); return false; } },
  load(key, def = null) { try { const d = localStorage.getItem(`entrelinhas_${key}`); return d ? JSON.parse(d) : def; } catch (e) { console.error(e); return def; } }
};

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
const Toast = {
  container: null, init() { this.container = document.getElementById('toast-container'); },
  show(message, type = 'info', title = null, duration = 5000) {
    if (!this.container) this.init();
    const icons = { success: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>', error: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>', warning: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>', info: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>' };
    const el = document.createElement('div');
    el.className = `toast ${type}`; el.setAttribute('role', 'alert'); el.setAttribute('aria-live', 'polite');
    el.innerHTML = `<div class="toast-icon">${icons[type] || icons.info}</div><div class="toast-content">${title ? `<div class="toast-title">${Utils.escapeHtml(title)}</div>` : ''}<div class="toast-message">${Utils.escapeHtml(message)}</div></div><button class="toast-close" aria-label="Fechar"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>`;
    el.querySelector('.toast-close').addEventListener('click', () => this.remove(el));
    this.container.appendChild(el);
    setTimeout(() => this.remove(el), duration);
    return el;
  },
  remove(el) { el.style.animation = 'slideInRight var(--transition-normal) reverse'; setTimeout(() => el.remove(), 250); },
  success(m, t) { return this.show(m, 'success', t); }, error(m, t) { return this.show(m, 'error', t); },
  warning(m, t) { return this.show(m, 'warning', t); }, info(m, t) { return this.show(m, 'info', t); }
};

// ============================================================================
// MODAL
// ============================================================================
const Modal = {
  overlay: null, title: null, message: null, confirmBtn: null, cancelBtn: null, closeBtn: null, onConfirm: null,
  init() { this.overlay = document.getElementById('modal-overlay'); this.title = document.getElementById('modal-title'); this.message = document.getElementById('modal-message'); this.confirmBtn = this.overlay.querySelector('.modal-confirm'); this.cancelBtn = this.overlay.querySelector('.modal-cancel'); this.closeBtn = this.overlay.querySelector('.modal-close'); this.cancelBtn.onclick = () => this.hide(); this.closeBtn.onclick = () => this.hide(); this.overlay.onclick = e => { if (e.target === this.overlay) this.hide(); }; document.addEventListener('keydown', e => { if (e.key === 'Escape' && !this.overlay.hidden) this.hide(); }); },
  show(title, message, onConfirm, confirmText = 'Confirmar', cancelText = 'Cancelar', isDanger = false) { if (!this.overlay) this.init(); this.title.textContent = title; this.message.textContent = message; this.confirmBtn.textContent = confirmText; this.cancelBtn.textContent = cancelText; this.confirmBtn.classList.toggle('btn-danger', isDanger); this.onConfirm = onConfirm; this.overlay.hidden = false; this.confirmBtn.focus(); const handler = () => { this.hide(); if (this.onConfirm) this.onConfirm(); this.confirmBtn.removeEventListener('click', handler); }; this.confirmBtn.addEventListener('click', handler); },
  hide() { this.overlay.hidden = true; this.onConfirm = null; },
  confirm(title, message, onConfirm, confirmText = 'Confirmar') { this.show(title, message, onConfirm, confirmText, 'Cancelar', true); }
};

// ============================================================================
// AUTENTICAÇÃO
// ============================================================================
const Auth = {
  init() { const u = Utils.load('user'); if (u) AppState.user = u; const su = sessionStorage.getItem('entrelinhas_user'); if (su && !AppState.user) { try { AppState.user = JSON.parse(su); } catch (e) { sessionStorage.removeItem('entrelinhas_user'); } } document.addEventListener('click', e => { if (e.target.closest('[data-screen="logout"]')) { e.preventDefault(); this.logout(); } }); },
  isAuthenticated() { return !!AppState.user; }, getCurrentUser() { return AppState.user; },
  login(email, password, remember) { const users = Utils.load('users', []); const user = users.find(u => u.email === email && u.password === password); if (user) { const { password: _, ...u } = user; AppState.user = u; if (remember) Utils.save('user', u); else sessionStorage.setItem('entrelinhas_user', JSON.stringify(u)); this.loadUserShelf(); Router.updateHeaderAuthState(); return { success: true, user: u }; } return { success: false, error: 'E-mail ou senha incorretos' }; },
  register(name, email, password) { const users = Utils.load('users', []); if (users.find(u => u.email === email)) return { success: false, error: 'E-mail já cadastrado' }; const newUser = { id: Utils.generateId(), name, email, password, createdAt: new Date().toISOString() }; users.push(newUser); Utils.save('users', users); const { password: _, ...u } = newUser; AppState.user = u; Utils.save('user', u); Utils.save(`shelf_${newUser.id}`, []); return { success: true, user: u }; },
  logout() { AppState.user = null; AppState.userShelf = []; localStorage.removeItem('entrelinhas_user'); sessionStorage.removeItem('entrelinhas_user'); Router.updateHeaderAuthState(); Router.navigate('#home'); Toast.show('Você saiu', 'info'); },
  loadUserShelf() { if (!AppState.user) return; AppState.userShelf = Utils.load(`shelf_${AppState.user.id}`, []); },
  saveUserShelf() { if (!AppState.user) return; Utils.save(`shelf_${AppState.user.id}`, AppState.userShelf); },
  updateProfile(data) { if (!AppState.user) return { success: false }; const users = Utils.load('users', []); const i = users.findIndex(u => u.id === AppState.user.id); if (i !== -1) { users[i] = { ...users[i], ...data }; Utils.save('users', users); const { password: _, ...u } = users[i]; AppState.user = u; Utils.save('user', u); return { success: true, user: u }; } return { success: false }; },
  changePassword(current, next) { if (!AppState.user) return { success: false }; const users = Utils.load('users', []); const i = users.findIndex(u => u.id === AppState.user.id); if (i !== -1 && users[i].password === current) { users[i].password = next; Utils.save('users', users); return { success: true }; } return { success: false, error: 'Senha atual incorreta' }; },
  deleteAccount() { if (!AppState.user) return { success: false }; Utils.save('users', Utils.load('users', []).filter(u => u.id !== AppState.user.id)); localStorage.removeItem(`entrelinhas_shelf_${AppState.user.id}`); this.logout(); return { success: true }; }
};

// ============================================================================
// ROTEADOR / NAVEGAÇÃO
// ============================================================================
const Router = {
  screens: ['home', 'explorar', 'minha-estante', 'cadastrar', 'login', 'cadastro', 'perfil'],
  protected: ['minha-estante', 'cadastrar', 'perfil'],
  init() { window.addEventListener('hashchange', () => this.handleHashChange()); window.addEventListener('load', () => this.handleHashChange()); document.addEventListener('click', e => { const a = e.target.closest('a[href^="#"]'); if (a) { e.preventDefault(); this.navigate(a.getAttribute('href')); } }); },
  handleHashChange() { const h = window.location.hash.slice(1) || 'home'; this.navigate(`#${h}`, false); },
  navigate(hash, push = true) { const s = hash.replace('#', ''); if (!this.screens.includes(s)) { this.navigate('#home'); return; } if (this.protected.includes(s) && !Auth.isAuthenticated()) { this.navigate('#login'); Toast.show('Faça login para acessar', 'warning'); return; } AppState.currentScreen = s; this.updateActiveScreen(s); this.updateActiveNavLink(s); this.updateHeaderAuthState(); window.scrollTo(0, 0); if (push) window.location.hash = s; this.onScreenEnter(s); },
  updateActiveScreen(s) { document.querySelectorAll('.screen').forEach(el => { el.classList.remove('active'); el.hidden = true; }); const t = document.getElementById(`screen-${s}`); if (t) { t.classList.add('active'); t.hidden = false; } },
  updateActiveNavLink(s) { document.querySelectorAll('.nav-link[data-screen]').forEach(l => l.classList.toggle('active', l.dataset.screen === s)); },
  updateHeaderAuthState() { const ll = document.querySelector('.nav-link[data-screen="login"]'), pl = document.querySelector('.nav-link[data-screen="perfil"]'); if (Auth.isAuthenticated()) { if (ll) { ll.textContent = 'Sair'; ll.dataset.screen = 'logout'; ll.classList.replace('btn-primary', 'btn-secondary'); } if (pl) pl.hidden = false; } else { if (ll) { ll.textContent = 'Entrar'; ll.dataset.screen = 'login'; ll.classList.replace('btn-secondary', 'btn-primary'); } if (pl) pl.hidden = true; } },
  onScreenEnter(s) { switch (s) { case 'home': HomeScreen.init(); break; case 'explorar': ExploreScreen.init(); break; case 'minha-estante': ShelfScreen.init(); break; case 'cadastrar': RegisterBookScreen.init(); break; case 'login': LoginScreen.init(); break; case 'cadastro': RegisterScreen.init(); break; case 'perfil': ProfileScreen.init(); break; } }
};

// ============================================================================
// TELA: HOME
// ============================================================================
const HomeScreen = {
  init() { this.renderFeatured(); this.renderNextReads(); },
  getFeatured() { return [...AppState.books].sort((a, b) => b.rating - a.rating).slice(0, 4); },
  getNextReads() { return [...AppState.books].sort(() => 0.5 - Math.random()).slice(0, 6); },
  renderFeatured() { const c = document.getElementById('featured-grid'); if (!c) return; c.innerHTML = this.getFeatured().map(b => this.card(b)).join(''); },
  renderNextReads() { const t = document.getElementById('carousel-track'); if (!t) return; t.innerHTML = this.getNextReads().map(b => this.card(b)).join(''); this.setupCarousel(); },
  setupCarousel() { const track = document.getElementById('carousel-track'), prev = document.querySelector('.carousel-prev'), next = document.querySelector('.carousel-next'); if (!track || !prev || !next) return; const upd = () => { const sl = track.scrollLeft, ms = track.scrollWidth - track.clientWidth; prev.disabled = sl <= 10; next.disabled = sl >= ms - 10; }; prev.onclick = () => track.scrollBy({ left: -300, behavior: 'smooth' }); next.onclick = () => track.scrollBy({ left: 300, behavior: 'smooth' }); track.addEventListener('scroll', upd); upd(); },
  card(b) { const cat = CATEGORIES[b.category] || b.category; return `<article class="book-card" role="listitem" data-book-id="${b.id}"><div class="book-card__cover">${b.cover ? `<img src="${b.cover}" alt="Capa de ${Utils.escapeHtml(b.title)}" loading="lazy">` : `<div class="book-card__cover-placeholder"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 12h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z"/></svg></div>`}<span class="book-card__badge">${cat}</span></div><div class="book-card__content"><h3 class="book-card__title">${Utils.escapeHtml(b.title)}</h3><p class="book-card__author">${Utils.escapeHtml(b.author)}</p><div class="book-card__meta"><span class="book-card__category">${cat}</span><span class="book-card__year">${b.year}</span></div><div class="book-card__rating"><div class="book-card__stars" aria-label="Avaliação: ${b.rating} de 5">${Utils.createStars(b.rating)}</div><span class="book-card__rating-value">${b.rating.toFixed(1)}</span></div></div></article>`; }
};

// ============================================================================
// TELA: EXPLORAR
// ============================================================================
const ExploreScreen = {
  debounce: null, init() { this.bind(); this.applyFilters(); this.updateView(); },
  bind() {
    const si = document.getElementById('search-input');
    if (si) { this.debounce = Utils.debounce(() => this.applyFilters(), 300); si.addEventListener('input', e => { AppState.filters.search = e.target.value.toLowerCase().trim(); this.debounce(); }); si.addEventListener('keypress', e => { if (e.key === 'Enter') this.applyFilters(); }); }
    const cf = document.getElementById('category-filter'); if (cf) cf.addEventListener('change', e => { AppState.filters.category = e.target.value; this.applyFilters(); });
    const sf = document.getElementById('status-filter'); if (sf) sf.addEventListener('change', e => { AppState.filters.status = e.target.value; this.applyFilters(); });
    const clr = document.getElementById('clear-filters'); if (clr) clr.addEventListener('click', () => this.clearFilters());
    document.querySelectorAll('.view-btn').forEach(b => b.addEventListener('click', () => { AppState.viewMode = b.dataset.view; this.updateView(); }));
  },
  clearFilters() { AppState.filters = { search: '', category: '', status: '' }; document.getElementById('search-input').value = ''; document.getElementById('category-filter').value = ''; document.getElementById('status-filter').value = ''; this.applyFilters(); },
  applyFilters() {
    let f = [...AppState.books];
    if (AppState.filters.search) { const t = AppState.filters.search; f = f.filter(b => b.title.toLowerCase().includes(t) || b.author.toLowerCase().includes(t) || b.synopsis.toLowerCase().includes(t) || b.tags.some(tg => tg.toLowerCase().includes(t))); }
    if (AppState.filters.category) f = f.filter(b => b.category === AppState.filters.category);
    if (AppState.filters.status && Auth.isAuthenticated()) { const ids = AppState.userShelf.filter(i => i.status === AppState.filters.status).map(i => i.bookId); f = f.filter(b => ids.includes(b.id)); }
    this.render(f); this.updateCount(f.length);
  },
  render(books) { const g = document.getElementById('books-grid'), e = document.getElementById('empty-state'); if (!g) return; if (!books.length) { g.innerHTML = ''; g.hidden = true; if (e) e.hidden = false; return; } g.hidden = false; if (e) e.hidden = true; g.innerHTML = books.map(b => this.card(b)).join(''); },
  updateCount(n) { const c = document.getElementById('books-count'); if (c) c.textContent = n; },
  updateView() { const g = document.getElementById('books-grid'); if (!g) return; g.classList.toggle('view-list', AppState.viewMode === 'list'); document.querySelectorAll('.view-btn').forEach(b => { const a = b.dataset.view === AppState.viewMode; b.classList.toggle('active', a); b.setAttribute('aria-pressed', a); }); this.applyFilters(); },
  card(b) { const cat = CATEGORIES[b.category] || b.category; let us = null, ur = null; if (Auth.isAuthenticated()) { const si = AppState.userShelf.find(i => i.bookId === b.id); if (si) { us = si.status; ur = si.rating; } } const badge = us ? `<span class="status-badge ${STATUS_BADGE_CLASSES[us]}">${STATUS_LABELS[us]}</span>` : ''; const list = AppState.viewMode === 'list' ? 'book-card--list' : ''; return `<article class="book-card ${list}" role="listitem" data-book-id="${b.id}"><div class="book-card__cover">${b.cover ? `<img src="${b.cover}" alt="Capa de ${Utils.escapeHtml(b.title)}" loading="lazy">` : `<div class="book-card__cover-placeholder"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 12h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z"/></svg></div>`}<span class="book-card__badge">${cat}</span>${badge}</div><div class="book-card__content"><h3 class="book-card__title">${Utils.escapeHtml(b.title)}</h3><p class="book-card__author">${Utils.escapeHtml(b.author)}</p><div class="book-card__meta"><span class="book-card__category">${cat}</span><span class="book-card__year">${b.year}</span></div><div class="book-card__rating"><div class="book-card__stars" aria-label="Avaliação: ${b.rating} de 5">${Utils.createStars(b.rating)}</div><span class="book-card__rating-value">${b.rating.toFixed(1)}</span></div>${Auth.isAuthenticated() ? `<div class="book-card__actions"><button class="book-card__action book-card__action--primary" data-action="add-to-shelf" data-book-id="${b.id}">${us ? 'Atualizar status' : 'Adicionar à estante'}</button><button class="book-card__action book-card__action--secondary" data-action="rate" data-book-id="${b.id}">${ur ? `Avaliar (${ur}★)` : 'Avaliar'}</button></div>` : ''}</div></article>`; }
};

// ============================================================================
// TELA: MINHA ESTANTE
// ============================================================================
const ShelfScreen = {
  init() { if (!Auth.isAuthenticated()) { Router.navigate('#login'); return; } Auth.loadUserShelf(); this.renderContinue(); this.renderRatings(); this.renderTabs(); this.bind(); },
  bind() { document.querySelectorAll('.status-tab').forEach(t => t.addEventListener('click', () => this.switchTab(t.dataset.status))); },
  getBooks(status) { let items = AppState.userShelf; if (status) items = items.filter(i => i.status === status); return items.map(i => { const b = AppState.books.find(b => b.id === i.bookId); return b ? { ...b, shelfData: i } : null; }).filter(Boolean); },
  renderContinue() { const g = document.getElementById('continue-grid'), e = document.getElementById('continue-empty'); if (!g) return; const bs = this.getBooks('andamento'); if (!bs.length) { g.innerHTML = ''; g.hidden = true; if (e) e.hidden = false; return; } g.hidden = false; if (e) e.hidden = true; g.innerHTML = bs.map(b => this.card(b)).join(''); },
  renderRatings() { const g = document.getElementById('ratings-grid'), e = document.getElementById('ratings-empty'); if (!g) return; const bs = AppState.userShelf.filter(i => i.rating).map(i => { const b = AppState.books.find(b => b.id === i.bookId); return b ? { ...b, shelfData: i } : null; }).filter(Boolean); if (!bs.length) { g.innerHTML = ''; g.hidden = true; if (e) e.hidden = false; return; } g.hidden = false; if (e) e.hidden = true; g.innerHTML = bs.map(b => this.card(b, true)).join(''); },
  renderTabs() { const counts = { completo: 0, andamento: 0, 'nao-iniciado': 0 }; AppState.userShelf.forEach(i => counts[i.status]++); Object.entries(counts).forEach(([s, c]) => { const el = document.getElementById(`count-${s}`); if (el) el.textContent = c; }); this.switchTab('completo'); },
  switchTab(s) { document.querySelectorAll('.status-tab').forEach(t => { const a = t.dataset.status === s; t.classList.toggle('active', a); t.setAttribute('aria-selected', a); }); document.querySelectorAll('.status-panel').forEach(p => { const a = p.id === `panel-${s}`; p.classList.toggle('active', a); p.hidden = !a; }); this.renderTabGrid(s); },
  renderTabGrid(s) { const g = document.getElementById(`grid-${s}`); if (!g) return; const bs = this.getBooks(s); if (!bs.length) { g.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg><h3>Nenhum livro ${STATUS_LABELS[s].toLowerCase()}</h3><p>${s === 'nao-iniciado' ? 'Adicione livros que deseja ler' : 'Mova livros para este status'}</p></div>`; return; } g.innerHTML = bs.map(b => this.card(b)).join(''); },
  card(b, showRating = false) { const cat = CATEGORIES[b.category] || b.category; const sd = b.shelfData; const ur = sd?.rating; const prog = sd?.progress || 0; return `<article class="book-card" role="listitem" data-book-id="${b.id}"><div class="book-card__cover">${b.cover ? `<img src="${b.cover}" alt="Capa de ${Utils.escapeHtml(b.title)}" loading="lazy">` : `<div class="book-card__cover-placeholder"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 12h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z"/></svg></div>`}<span class="book-card__badge">${cat}</span>${sd ? `<span class="status-badge ${STATUS_BADGE_CLASSES[sd.status]}">${STATUS_LABELS[sd.status]}</span>` : ''}</div><div class="book-card__content"><h3 class="book-card__title">${Utils.escapeHtml(b.title)}</h3><p class="book-card__author">${Utils.escapeHtml(b.author)}</p><div class="book-card__meta"><span class="book-card__category">${cat}</span><span class="book-card__year">${b.year}</span></div>${sd && sd.status === 'andamento' && prog > 0 ? `<div class="reading-progress" style="margin:var(--space-3) 0"><div class="reading-progress__bar" style="width:${prog}%"></div><div class="reading-progress__label"><span>${prog}% lido</span><span>${sd.currentPage || 0}/${b.totalPages || '?'} páginas</span></div></div>` : ''}<div class="book-card__rating"><div class="book-card__stars" aria-label="Avaliação: ${b.rating} de 5">${Utils.createStars(b.rating)}</div><span class="book-card__rating-value">${b.rating.toFixed(1)}</span></div>${showRating && ur ? `<div class="book-card__rating" style="margin-top:var(--space-2);padding-top:var(--space-2);border-top:1px solid var(--color-border-light)"><div class="book-card__stars" aria-label="Sua avaliação: ${ur} de 5">${Utils.createStars(ur)}</div><span class="book-card__rating-value" style="color:var(--color-primary)">Sua nota: ${ur}</span></div>` : ''}<div class="book-card__actions"><button class="book-card__action book-card__action--primary" data-action="change-status" data-book-id="${b.id}">${sd ? 'Alterar status' : 'Adicionar à estante'}</button><button class="book-card__action book-card__action--secondary" data-action="rate" data-book-id="${b.id}">${ur ? `Avaliar (${ur}★)` : 'Avaliar'}</button></div></div></article>`; }
};

// ============================================================================
// TELA: CADASTRAR LIVRO
// ============================================================================
const RegisterBookScreen = {
  form: null, init() { if (!Auth.isAuthenticated()) { Router.navigate('#login'); return; } this.form = document.getElementById('book-form'); this.bind(); this.reset(); },
  bind() { if (!this.form) return; this.form.addEventListener('submit', e => this.submit(e)); this.form.addEventListener('reset', () => setTimeout(() => this.reset(), 0)); this.form.querySelectorAll('input, select, textarea').forEach(i => { i.addEventListener('blur', () => this.validate(i)); i.addEventListener('input', () => this.clear(i)); }); const sy = document.getElementById('book-synopsis'), ce = document.getElementById('synopsis-count'); if (sy && ce) sy.addEventListener('input', () => { const l = sy.value.length; ce.textContent = `${l}/2000`; ce.classList.toggle('warning', l > 1800); ce.classList.toggle('error', l > 2000); }); const ci = document.getElementById('book-cover'); if (ci) ci.addEventListener('input', Utils.debounce(() => this.preview(), 500)); const nb = document.getElementById('form-new-book'); if (nb) nb.addEventListener('click', () => this.reset()); },
  validate(f) { const e = document.getElementById(`${f.id}-error`); let v = true, m = ''; if (f.required && !f.value.trim()) { v = false; m = 'Obrigatório'; } if (f.type === 'email' && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) { v = false; m = 'E-mail inválido'; } if (f.type === 'number' && f.value) { const min = parseInt(f.min), max = parseInt(f.max), val = parseInt(f.value); if (!isNaN(min) && val < min) { v = false; m = `Mínimo ${min}`; } if (!isNaN(max) && val > max) { v = false; m = `Máximo ${max}`; } } if (f.minLength && f.value.length < f.minLength) { v = false; m = `Mínimo ${f.minLength} caracteres`; } if (f.maxLength && f.value.length > f.maxLength) { v = false; m = `Máximo ${f.maxLength} caracteres`; } if (f.type === 'url' && f.value && !this.isUrl(f.value)) { v = false; m = 'URL inválida'; } if (f.name === 'confirmPassword') { const p = document.getElementById('register-password')?.value || document.getElementById('new-password')?.value; if (f.value !== p) { v = false; m = 'Senhas não conferem'; } } f.classList.toggle('valid', v && f.value); f.classList.toggle('invalid', !v && f.value); if (e) e.textContent = m; return v; },
  clear(f) { f.classList.remove('invalid'); const e = document.getElementById(`${f.id}-error`); if (e) e.textContent = ''; },
  isUrl(u) { try { new URL(u); return true; } catch { return false; } },
  preview() { const ci = document.getElementById('book-cover'), ee = document.getElementById('cover-error'); if (!ci.value.trim()) { this.removePreview(); return; } if (!this.isUrl(ci.value)) { if (ee) ee.textContent = 'URL inválida'; return; } if (ee) ee.textContent = ''; let p = document.getElementById('cover-preview'); if (!p) { p = document.createElement('div'); p.id = 'cover-preview'; p.className = 'cover-preview'; ci.parentNode.appendChild(p); } p.innerHTML = `<img src="${ci.value}" alt="Preview" onerror="this.parentElement.innerHTML='<p style=color:var(--color-error)>Erro ao carregar</p>'">`; },
  removePreview() { const p = document.getElementById('cover-preview'); if (p) p.remove(); },
  validateForm() { const fs = this.form.querySelectorAll('input[required], select[required], textarea[required]'); let v = true; fs.forEach(f => { if (!this.validate(f)) v = false; }); return v; },
  submit(e) { e.preventDefault(); if (!this.validateForm()) { Toast.show('Corrija os erros', 'error'); return; } const fd = new FormData(this.form); const bd = { id: Utils.generateId(), title: fd.get('title').trim(), author: fd.get('author').trim(), category: fd.get('category'), year: parseInt(fd.get('year')), synopsis: fd.get('synopsis').trim(), cover: fd.get('cover').trim() || null, rating: 0, tags: [], createdAt: new Date().toISOString() }; AppState.books.unshift(bd); Utils.save('books', AppState.books); this.form.hidden = true; document.getElementById('form-success').hidden = false; Toast.show('Livro cadastrado!', 'success'); if (AppState.currentScreen === 'explorar') ExploreScreen.applyFilters(); if (AppState.currentScreen === 'home') HomeScreen.init(); },
  reset() { if (!this.form) return; this.form.hidden = false; document.getElementById('form-success').hidden = true; this.form.reset(); this.form.querySelectorAll('input, select, textarea').forEach(f => { f.classList.remove('valid', 'invalid'); const e = document.getElementById(`${f.id}-error`); if (e) e.textContent = ''; }); const ce = document.getElementById('synopsis-count'); if (ce) { ce.textContent = '0/2000'; ce.classList.remove('warning', 'error'); } this.removePreview(); }
};

// ============================================================================
// TELA: LOGIN
// ============================================================================
const LoginScreen = {
  form: null, init() { if (Auth.isAuthenticated()) { Router.navigate('#home'); return; } this.form = document.getElementById('login-form'); this.bind(); },
  bind() { if (!this.form) return; this.form.addEventListener('submit', e => this.submit(e)); this.form.querySelectorAll('.password-toggle').forEach(b => b.addEventListener('click', () => this.toggle(b))); this.form.querySelectorAll('input').forEach(i => { i.addEventListener('blur', () => this.validate(i)); i.addEventListener('input', () => this.clear(i)); }); },
  validate(f) { const e = document.getElementById(`${f.id}-error`); let v = true, m = ''; if (f.required && !f.value.trim()) { v = false; m = 'Obrigatório'; } if (f.type === 'email' && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) { v = false; m = 'E-mail inválido'; } f.classList.toggle('valid', v && f.value); f.classList.toggle('invalid', !v && f.value); if (e) e.textContent = m; return v; },
  clear(f) { f.classList.remove('invalid'); const e = document.getElementById(`${f.id}-error`); if (e) e.textContent = ''; },
  toggle(b) { const i = b.parentElement.querySelector('input'); const v = i.type === 'text'; i.type = v ? 'password' : 'text'; b.setAttribute('aria-pressed', !v); },
  submit(e) { e.preventDefault(); const em = document.getElementById('login-email').value.trim(); const pw = document.getElementById('login-password').value; const rm = document.getElementById('login-remember').checked; if (!em || !pw) { Toast.show('Preencha todos os campos', 'error'); return; } const r = Auth.login(em, pw, rm); if (r.success) { Toast.show(`Bem-vindo, ${r.user.name}!`, 'success'); Router.navigate('#home'); } else { Toast.show(r.error, 'error'); document.getElementById('login-password').focus(); } }
};

// ============================================================================
// TELA: CADASTRO
// ============================================================================
const RegisterScreen = {
  form: null, init() { if (Auth.isAuthenticated()) { Router.navigate('#home'); return; } this.form = document.getElementById('register-form'); this.bind(); },
  bind() { if (!this.form) return; this.form.addEventListener('submit', e => this.submit(e)); this.form.querySelectorAll('.password-toggle').forEach(b => b.addEventListener('click', () => this.toggle(b))); const pi = document.getElementById('register-password'); if (pi) pi.addEventListener('input', () => this.strength(pi.value)); this.form.querySelectorAll('input').forEach(i => { i.addEventListener('blur', () => this.validate(i)); i.addEventListener('input', () => this.clear(i)); }); },
  validate(f) { const e = document.getElementById(`${f.id}-error`); let v = true, m = ''; if (f.required && !f.value.trim()) { v = false; m = 'Obrigatório'; } if (f.type === 'email' && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) { v = false; m = 'E-mail inválido'; } if (f.minLength && f.value.length < f.minLength) { v = false; m = `Mínimo ${f.minLength} caracteres`; } if (f.name === 'confirmPassword') { const p = document.getElementById('register-password').value; if (f.value !== p) { v = false; m = 'Senhas não conferem'; } } f.classList.toggle('valid', v && f.value); f.classList.toggle('invalid', !v && f.value); if (e) e.textContent = m; return v; },
  clear(f) { f.classList.remove('invalid'); const e = document.getElementById(`${f.id}-error`); if (e) e.textContent = ''; },
  toggle(b) { const i = b.parentElement.querySelector('input'); const v = i.type === 'text'; i.type = v ? 'password' : 'text'; b.setAttribute('aria-pressed', !v); },
  strength(p) { const bar = document.querySelector('.password-strength__bar'), lbs = document.querySelectorAll('.password-strength__label'); if (!bar) return; let s = 0; if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++; const lv = ['weak', 'fair', 'good', 'strong']; bar.className = `password-strength__bar ${lv[s-1] || ''}`; lbs.forEach((l, i) => l.classList.toggle('active', i < s)); },
  submit(e) { e.preventDefault(); const nm = document.getElementById('register-name').value.trim(); const em = document.getElementById('register-email').value.trim(); const pw = document.getElementById('register-password').value; const cf = document.getElementById('register-confirm').value; const tm = document.getElementById('register-terms').checked; if (!nm || !em || !pw || !cf) { Toast.show('Preencha todos', 'error'); return; } if (!tm) { Toast.show('Aceite os termos', 'error'); return; } const r = Auth.register(nm, em, pw); if (r.success) { Toast.show(`Conta criada! Bem-vindo, ${nm}!`, 'success'); Router.navigate('#home'); } else Toast.show(r.error, 'error'); }
};

// ============================================================================
// TELA: PERFIL
// ============================================================================
const ProfileScreen = {
  init() { if (!Auth.isAuthenticated()) { Router.navigate('#login'); return; } this.render(); this.bind(); },
  render() { const u = Auth.getCurrentUser(); if (!u) return; const av = document.getElementById('profile-avatar'); if (av) av.innerHTML = `<span style="font-size:2rem;font-weight:600">${Utils.getInitials(u.name)}</span>`; document.getElementById('profile-name').textContent = u.name; document.getElementById('profile-email').textContent = u.email; document.getElementById('profile-name-input').value = u.name; document.getElementById('profile-email-input').value = u.email; const tot = AppState.userShelf.length, rd = AppState.userShelf.filter(i => i.status === 'completo').length, rg = AppState.userShelf.filter(i => i.status === 'andamento').length; document.getElementById('stat-books').textContent = tot; document.getElementById('stat-read').textContent = rd; document.getElementById('stat-reading').textContent = rg; },
  bind() { const pf = document.getElementById('profile-form'); if (pf) pf.addEventListener('submit', e => this.updateProfile(e)); const pwf = document.getElementById('password-form'); if (pwf) pwf.addEventListener('submit', e => this.changePass(e)); const db = document.getElementById('btn-delete-account'); if (db) db.addEventListener('click', () => this.deleteAcc()); const lb = document.getElementById('btn-logout'); if (lb) lb.addEventListener('click', () => Auth.logout()); document.querySelectorAll('#password-form .password-toggle').forEach(b => b.addEventListener('click', () => this.toggle(b))); },
  toggle(b) { const i = b.parentElement.querySelector('input'); const v = i.type === 'text'; i.type = v ? 'password' : 'text'; b.setAttribute('aria-pressed', !v); },
  updateProfile(e) { e.preventDefault(); const nm = document.getElementById('profile-name-input').value.trim(); const em = document.getElementById('profile-email-input').value.trim(); if (!nm || !em) { Toast.show('Preencha todos', 'error'); return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { Toast.show('E-mail inválido', 'error'); return; } const r = Auth.updateProfile({ name: nm, email: em }); if (r.success) { this.render(); Toast.show('Perfil atualizado', 'success'); } else Toast.show('Erro', 'error'); },
  changePass(e) { e.preventDefault(); const cu = document.getElementById('current-password').value; const np = document.getElementById('new-password').value; const cn = document.getElementById('confirm-new-password').value; if (!cu || !np || !cn) { Toast.show('Preencha todos', 'error'); return; } if (np.length < 8) { Toast.show('Mínimo 8 caracteres', 'error'); return; } if (np !== cn) { Toast.show('Senhas não conferem', 'error'); return; } const r = Auth.changePassword(cu, np); if (r.success) { e.target.reset(); Toast.show('Senha alterada', 'success'); } else Toast.show(r.error || 'Erro', 'error'); },
  deleteAcc() { Modal.confirm('Excluir Conta', 'Irreversível. Todos os dados serão perdidos. Confirmar?', () => { Auth.deleteAccount(); Toast.show('Conta excluída', 'info'); }, 'Excluir definitivamente'); }
};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================
function initApp() {
  AppState.books = Utils.load('books', INITIAL_BOOKS); Utils.save('books', AppState.books);
  Auth.init(); Toast.init(); Modal.init(); Router.init();
  const nt = document.querySelector('.nav-toggle'), nm = document.getElementById('nav-menu');
  if (nt && nm) { nt.addEventListener('click', () => { const o = nm.classList.toggle('open'); nt.setAttribute('aria-expanded', o); nm.setAttribute('aria-hidden', !o); }); nm.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { nm.classList.remove('open'); nt.setAttribute('aria-expanded', 'false'); nm.setAttribute('aria-hidden', 'true'); })); }
  Router.updateHeaderAuthState();
  console.log('🌟 Entrelinhas pronto!');
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initApp); else initApp();

// Debug global
window.Entrelinhas = { AppState, Auth, Toast, Modal, Router, Utils };