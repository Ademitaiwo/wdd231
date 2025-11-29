
// Generate timestamp when the form loads
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");

    // Format the timestamp (Nigeria Time)
    const now = new Date();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Africa/Lagos"
    };

    const formatted = now.toLocaleString("en-US", options);
    timestampField.value = formatted;
});

// Display submitted form data on thankyou.html
    const params = new URLSearchParams(window.location.search);

    document.querySelector("#results").innerHTML = `
    <p><strong>First Name:</strong> ${params.get("first")}</p>
    <p><strong>Last Name:</strong> ${params.get("last")}</p>
    <p><strong>Organizational Title:</strong> ${params.get("orgTitle")}</p>
    <p><strong>Email:</strong> ${params.get("email")}</p>
    <p><strong>Phone:</strong> ${params.get("phone")}</p>
    <p><strong>Business:</strong> ${params.get("business")}</p>
    <p><strong>Membership Level:</strong> ${params.get("membership")}</p>
    <p><strong>Description:</strong> ${params.get("description")}</p>
    <p><strong>Timestamp:</strong> ${params.get("timestamp")}</p>
        `;



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
