async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    // filter gold or silver members
    const qualified = data.members.filter(m =>
        m.membership === "Gold" || m.membership === "Silver"
    );

    // pick 2-3 random members
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selected.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
      <img src="${member.logo}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="level">${member.membership} Member</p>
    `;
        container.appendChild(card);
    });
}

loadSpotlights();
