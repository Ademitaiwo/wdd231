document.addEventListener('DOMContentLoaded', () => {
    const navbutton = document.getElementById('ham-btn');
    const nav = document.querySelector('nav');
    if (!navbutton) return;

    navbutton.addEventListener('click', () => {
        // toggle visual X on the button
        navbutton.classList.toggle('show');
        // toggle the nav visibility
        if (nav) nav.classList.toggle('show');
    });
});