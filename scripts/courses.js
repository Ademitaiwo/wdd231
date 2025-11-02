// Course data
const courses = [
    {
        code: "CSE 121b",
        name: "JavaScript Language",
        description: "Learn JavaScript fundamentals including syntax, arrays, objects, classes and modules. Introduction to the Document Object Model (DOM) and asynchronous programming.",
        section: "programming",
        completed: false,
        credits: 3
    },
    {
        code: "WDD 230",
        name: "Web Frontend Development I",
        description: "Frontend development fundamentals using HTML, CSS, and JavaScript. Focus on responsive design principles and performance optimization.",
        section: "web",
        completed: true,
        credits: 3
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development II",
        description: "Advanced CSS techniques, responsive layouts, JavaScript libraries, and modern web development workflows.",
        section: "web",
        completed: false,
        credits: 3
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        description: "Introduction to programming concepts using functions, focusing on problem-solving and software design principles.",
        section: "programming",
        completed: true,
        credits: 3
    },
    {
        code: "WDD 330",
        name: "Web Frontend Development III",
        description: "Advanced JavaScript, modern frameworks, and progressive web applications.",
        section: "web",
        completed: false,
        credits: 3
    }
];

// DOM Elements
const coursesContainer = document.getElementById('courses-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalCredits = document.getElementById('total-credits');

// Filter and display courses
function filterCourses(filter = 'all') {
    const filtered = courses.filter(course => {
        if (filter === 'all') return true;
        if (filter === 'wdd') return course.code.startsWith('WDD');
        if (filter === 'cse') return course.code.startsWith('CSE');
        return false;
    });

    displayCourses(filtered);
    updateTotalCredits(filtered);
}

// Display courses in the DOM
function displayCourses(coursesToShow) {
    coursesContainer.innerHTML = coursesToShow.map(course => `
        <article class="course-card ${course.completed ? 'completed' : ''}">
            <h3>${course.code}</h3>
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <p class="credits">Credits: ${course.credits}</p>
            ${course.completed ? '<span class="completion-badge">Completed</span>' : ''}
        </article>
    `).join('');
}

// Update total credits
function updateTotalCredits(coursesToCount) {
    const total = coursesToCount.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = `Total Credits: ${total}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial display
    filterCourses('all');

    // Filter button listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            filterCourses(e.target.dataset.filter);
        });
    });
});