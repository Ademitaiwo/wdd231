// ==========================
// Mobile Navigation Toggle
// ==========================

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.primary-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('open');
    });
}
