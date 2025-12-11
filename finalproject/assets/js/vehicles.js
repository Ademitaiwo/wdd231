// assets/js/vehicles.js
import { createModal } from './modal.js';

const ITEMS_PER_PAGE = 8;

// helper: safe numeric price extractor
function parsePrice(item) {
    if (item == null) return 0;
    // if it's already a number
    if (typeof item.price === 'number') return item.price;
    // if price is a string like "$118,000" or "118000"
    if (typeof item.price === 'string') {
        const digits = item.price.replace(/[^0-9.-]+/g, '');
        const n = Number(digits);
        return isFinite(n) ? n : 0;
    }
    return 0;
}

// helper: canonical display name
function displayName(item) {
    if (!item) return '';
    if (item.name) return item.name;
    if (item.brand && item.model) return `${item.brand} ${item.model}`;
    if (item.brand) return item.brand;
    return 'Unknown';
}

// Normalize incoming data: accept either array or { vehicles: [...] }
export function normalizeData(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw.vehicles)) return raw.vehicles;
    // fallback: find first array value in object
    for (const k of Object.keys(raw)) {
        if (Array.isArray(raw[k])) return raw[k];
    }
    return [];
}

export function renderControls(state) {
    const search = document.getElementById('search');
    const category = document.getElementById('category');
    const sort = document.getElementById('sort');
    if (search) search.value = state.search || '';
    if (category) category.value = state.category || 'all';
    if (sort) sort.value = state.sort || 'featured';
}

export function applyFilters(data, state) {
    let arr = Array.isArray(data) ? [...data] : [];
    if (state.search) {
        const q = state.search.toLowerCase();
        arr = arr.filter(v => {
            const text = [
                displayName(v),
                v.brand || '',
                v.model || '',
                v.description || '',
                v.body || ''
            ].join(' ').toLowerCase();
            return text.includes(q);
        });
    }
    if (state.category && state.category !== 'all') {
        arr = arr.filter(v => (v.body || '').toLowerCase() === state.category.toLowerCase());
    }

    // sort
    if (state.sort === 'year-desc') arr.sort((a, b) => (b.year || 0) - (a.year || 0));
    else if (state.sort === 'price-asc') arr.sort((a, b) => parsePrice(a) - parsePrice(b));
    else if (state.sort === 'price-desc') arr.sort((a, b) => parsePrice(b) - parsePrice(a));
    else arr.sort((a, b) => ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)));

    return arr;
}

export function renderGrid(container, items, page = 1, favorites = []) {
    if (!container) return;
    container.innerHTML = '';
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

    if (!pageItems.length) {
        container.innerHTML = `<p class="status">No vehicles found.</p>`;
        return;
    }

    pageItems.forEach(item => {
        const card = document.createElement('article');
        card.className = 'trail-card';

        // resolve image path relative to current document
        const imagePath = item.image || '';
        let imageSrc = '';
        try {
            imageSrc = new URL(imagePath, document.baseURI).href;
        } catch (e) {
            imageSrc = imagePath;
        }

        const name = displayName(item);
        const priceDisplay = (typeof item.price === 'number') ? `$${item.price.toLocaleString()}` :
            (item.price ? item.price : '—');

        card.innerHTML = `
      <div class="media">
        <img src="${imageSrc}" alt="${name}" loading="lazy" width="800" height="400" onerror="this.style.visibility='hidden'">
      </div>
      <div class="card-body">
        <h3>${name}</h3>
        <p class="card-meta"><span>${item.brand || ''}</span><span>${item.year || ''}</span></p>
        <p>${item.description || ''}</p>
        <p class="card-meta"><strong>Price:</strong> ${priceDisplay}</p>
        <div class="card-actions">
          <button class="btn-small details" data-id="${item.id}">Details</button>
          <button class="btn-small fav" aria-pressed="${favorites.includes(item.id)}" data-id="${item.id}">${favorites.includes(item.id) ? '♥' : '♡'}</button>
        </div>
      </div>
    `;
        container.appendChild(card);
    });
}

export function renderPagination(container, totalItems, currentPage = 1) {
    if (!container) return;
    container.innerHTML = '';
    const pages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    for (let i = 1; i <= pages; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn-small';
        btn.textContent = i;
        btn.dataset.page = i;
        if (i === currentPage) btn.disabled = true;
        container.appendChild(btn);
    }
}

export function attachHandlers(root, data, state, setState) {
    const modal = createModal();
    if (!root) return;

    root.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        if (btn.classList.contains('details')) {
            const id = Number(btn.dataset.id);
            const item = (Array.isArray(data) ? data : []).find(d => Number(d.id) === id);
            if (!item) return;
            let modalImage = '';
            try { modalImage = new URL(item.image || '', document.baseURI).href; } catch (e) { modalImage = item.image || ''; }
            modal.open(`
        <h2>${displayName(item)}</h2>
        ${modalImage ? `<img src="${modalImage}" alt="${displayName(item)}">` : ''}
        <p>${item.description || ''}</p>
        <ul>
          ${item.brand ? `<li><strong>Brand:</strong> ${item.brand}</li>` : ''}
          ${item.year ? `<li><strong>Year:</strong> ${item.year}</li>` : ''}
          ${item.body ? `<li><strong>Body:</strong> ${item.body}</li>` : ''}
          ${typeof item.price !== 'undefined' ? `<li><strong>Price:</strong> $${parsePrice(item).toLocaleString()}</li>` : ''}
        </ul>
      `);
        } else if (btn.classList.contains('fav')) {
            const id = Number(btn.dataset.id);
            const favs = JSON.parse(localStorage.getItem('aureum-favs') || '[]');
            const idx = favs.indexOf(id);
            if (idx >= 0) favs.splice(idx, 1); else favs.push(id);
            localStorage.setItem('aureum-favs', JSON.stringify(favs));
            setState({ ...state, favorites: favs });
        } else if (btn.dataset.page) {
            setState({ ...state, page: Number(btn.dataset.page) });
        }
    });
}
