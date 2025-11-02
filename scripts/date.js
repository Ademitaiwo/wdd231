// Update copyright year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    // Set current year for copyright
    const currentYear = new Date().getFullYear();
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = currentYear;
    }

    // Set last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
});