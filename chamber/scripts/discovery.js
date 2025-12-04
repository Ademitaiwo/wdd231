// ---------------------- HAMBURGER MENU ----------------------
const hamBtn = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

// ---------------------- VISIT COUNTER ----------------------
let visits = Number(localStorage.getItem("discoverVisits")) || 0;
visits++;
localStorage.setItem("discoverVisits", visits);

document.getElementById("visit-count").textContent = `${visits} times`;

// ---------------------- EVENTS SECTION ----------------------
const eventsList = document.getElementById("events-list");

const events = [
    "Ibadan Cultural Festival – March 12",
    "Tech Summit Ibadan – April 4",
    "Local Food Market Day – May 18",
    "Trade & Business Expo – June 9"
];

eventsList.innerHTML = "";
events.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e;
    eventsList.appendChild(li);
});
