// assets/js/main.js
import { fetchVehicles } from './api.js';
import { renderControls, applyFilters, renderGrid, renderPagination, attachHandlers } from './vehicles.js';

const state = {
    data: [],
    search: localStorage.getItem('aureum-search') || '',
    category: localStorage.getItem('aureum-category') || 'all',
    sort: localStorage.getItem('aureum-sort') || 'featured',
    page: Number(localStorage.getItem('aureum-page') || 1),
    favorites: JSON.parse(localStorage.getItem('aureum-favs') || '[]')
};

const els = {
    status: document.getElementById('status'),
    gallery: document.getElementById('gallery'),
    pagination: document.getElementById('pagination'),
    search: document.getElementById('search'),
    category: document.getElementById('category'),
    sort: document.getElementById('sort')
};

document.getElementById('year')?.textContent = new Date().getFullYear();
document.getElementById('year2')?.textContent = new Date().getFullYear();
document.getElementById('year3')?.textContent = new Date().getFullYear();

// Development helper: automatically unregister service workers when served from localhost
const DEV_UNREGISTER_SW = (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
async function unregisterServiceWorkersAndClearCache() {
    if (!('serviceWorker' in navigator)) return;
    try {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
        // optionally clear caches (only in dev)
        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
        }
        console.info('Service workers unregistered and caches cleared (dev).');
    } catch (e) {
        console.warn('Failed to unregister service workers:', e);
    }
}

if (DEV_UNREGISTER_SW) {
    // run async but do not block UI
    unregisterServiceWorkersAndClearCache();
}

// theme toggles
function initTheme() {
    const themeBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-2, #theme-toggle-3');
    const dark = localStorage.getItem('aureum-theme') === 'dark';
    document.body.classList.toggle('theme-dark', dark);
    themeBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', dark); btn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('theme-dark');
            localStorage.setItem('aureum-theme', isDark ? 'dark' : 'light');
            themeBtns.forEach(b => b.setAttribute('aria-pressed', isDark));
        })
    });
}
initTheme();

// hamburger
document.querySelectorAll('.hamburger').forEach(h => {
    h.addEventListener('click', () => {
        const nav = document.getElementById('primary-nav');
        const expanded = h.getAttribute('aria-expanded') === 'true';
        h.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('open');
    });
});

async function init() {
    try {
        const response = await fetchVehicles('assets/data/vehicles.json');
        // Handle nested vehicles structure
        state.data = response.vehicles || response;
        renderControls(state);
        updateUI();

        // controls events
        els.search?.addEventListener('input', (e) => {
            state.search = e.target.value;
            localStorage.setItem('aureum-search', state.search);
            state.page = 1; localStorage.setItem('aureum-page', '1');
            updateUI();
        });

        els.category?.addEventListener('change', (e) => {
            state.category = e.target.value;
            localStorage.setItem('aureum-category', state.category);
            state.page = 1; localStorage.setItem('aureum-page', '1');
            updateUI();
        });

        els.sort?.addEventListener('change', (e) => {
            state.sort = e.target.value;
            localStorage.setItem('aureum-sort', state.sort);
            updateUI();
        });

        attachHandlers(els.gallery, state.data, state, (s) => { Object.assign(state, s); updateUI(); });

    } catch (err) {
        console.error(err);
        if (els.status) els.status.textContent = 'Unable to load vehicle data. Check console.';
    }
}

function updateUI() {
    const filtered = applyFilters(state.data, state);
    const total = filtered.length;
    if (els.status) els.status.textContent = `${total} vehicles`;
    const maxPage = Math.max(1, Math.ceil(total / 8));
    if (state.page > maxPage) state.page = maxPage;
    renderGrid(els.gallery, filtered, state.page, state.favorites);
    renderPagination(els.pagination, total, state.page);
    localStorage.setItem('aureum-page', state.page);
}

init();
