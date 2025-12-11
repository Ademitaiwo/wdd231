// assets/js/modal.js
export function createModal() {
    let lastFocused = null;
    const modal = document.createElement('div');
    modal.className = 'modal hidden';
    modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" tabindex="-1">
      <button class="modal-close" aria-label="Close dialog">✕</button>
      <div class="modal-body"></div>
    </div>
  `;
    document.body.appendChild(modal);

    const content = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.modal-close');

    function open(html) {
        lastFocused = document.activeElement;
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.querySelector('.modal-body').innerHTML = html;
        content.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKey);
    }

    function close() {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
        document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') {
            const focusable = content.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
            if (!focusable.length) return;
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

    return { open, close };
}
