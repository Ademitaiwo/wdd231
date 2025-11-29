// Set current timestamp on form load
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toLocaleString();
}

// Handle modals for membership cards
document.querySelectorAll('.info-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const membership = e.target.closest('.card').dataset.membership;
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `<h3>${membership.toUpperCase()} Membership Benefits</h3>
      <p>Benefits include special events, training, advertising, discounts, and more.</p>
      <button class="close-btn">Close</button>`;
        document.body.appendChild(dialog);
        dialog.showModal();
        dialog.querySelector('.close-btn').addEventListener('click', () => {
            dialog.close();
            dialog.remove();
        });
    });
});

// Display form data on thankyou.html
if (document.getElementById('results')) {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('results').innerHTML = `
    <p>First Name: ${params.get('first')}</p>
    <p>Last Name: ${params.get('last')}</p>
    <p>Email: ${params.get('email')}</p>
    <p>Mobile: ${params.get('phone')}</p>
    <p>Business/Organization: ${params.get('business')}</p>
    <p>Timestamp: ${params.get('timestamp')}</p>
  `;
}
