// Responsive Menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Display Last Modified Date
document.getElementById("lastModified").textContent = document.lastModified;

// Fetch and Display Member Data
const membersContainer = document.getElementById("members");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    membersContainer.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership-level">Membership: ${member.membershipLevel}</p>
    `;
        membersContainer.appendChild(card);
    });
}

// View Toggle
document.getElementById("grid-view").addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});

document.getElementById("list-view").addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});

getMembers();
