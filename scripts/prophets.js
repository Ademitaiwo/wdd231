const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.firstname} ${prophet.lastname}`;

        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.firstname} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the section(card) with the created elements
        card.appendChild(fullName);
        card.appendChild(portrait);

        // Add the card to the main div
        cards.appendChild(card);
    });
};

// Example: Fetch prophet data from a JSON file (if you have one)
const requestURL = 'https://byui-cit230.github.io/lessons/lesson09/data/prophets.json';

fetch(requestURL)
    .then(response => response.json())
    .then(data => displayProphets(data.prophets));
