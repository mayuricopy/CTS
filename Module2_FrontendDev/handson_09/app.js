import { courses } from "./data.js";

const courseGrid = document.querySelector(".course-grid");
const totalCredits = document.getElementById("total-credits");
const searchInput = document.getElementById("search-courses");
const sortButton = document.getElementById("sort-btn");
const selectedCourse = document.getElementById("selected-course");
const searchResults = document.getElementById("search-results");

let displayedCourses = [...courses];

// ---------- Task 1 Console Output ----------

courses.forEach(course => {
    const { name, credits } = course;
    console.log(name, credits);
});

console.log(
    courses.map(course =>
        `${course.code} — ${course.name} (${course.credits} credits)`
    )
);

const filtered = courses.filter(course => course.credits >= 4);
console.log(filtered);

console.log("Count =", filtered.length);

console.log(
    "Total Credits =",
    courses.reduce((sum, course) => sum + course.credits, 0)
);

// ---------- Render ----------

function renderCourses(courseArray) {

    courseGrid.innerHTML = "";

    const fragment = document.createDocumentFragment();

    courseArray.forEach(course => {

        const card = document.createElement("article");

        card.className = "course-card";

        card.dataset.id = course.id;

        // Make the course card keyboard accessible
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            `Select ${course.name}, ${course.credits} credits, grade ${course.grade}`
        );

        card.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Code:</strong> ${course.code}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Grade:</strong> ${course.grade}</p>
        `;

        fragment.appendChild(card);

    });

    courseGrid.appendChild(fragment);

    totalCredits.textContent =
        `Total Credits: ${
            courseArray.reduce(
                (sum, c) => sum + c.credits,
                0
            )
        }`;

    searchResults.textContent =
        `${courseArray.length} course${courseArray.length === 1 ? "" : "s"} displayed.`;
}

renderCourses(displayedCourses);

// ---------- Search ----------

searchInput.addEventListener("input", e => {

    const value = e.target.value.toLowerCase().trim();

    displayedCourses = courses.filter(course =>
        course.name.toLowerCase().includes(value)
    );

    renderCourses(displayedCourses);
});

// ---------- Sort ----------

sortButton.addEventListener("click", () => {

    displayedCourses.sort(
        (a, b) => b.credits - a.credits
    );

    renderCourses(displayedCourses);
});

// ---------- Select Course ----------

function selectCourse(card) {

    const id = Number(card.dataset.id);

    const course = displayedCourses.find(
        c => c.id === id
    );

    if (!course) return;

    selectedCourse.textContent =
        `Selected Course: ${course.name} | Grade: ${course.grade}`;
}

// ---------- Mouse Interaction ----------

courseGrid.addEventListener("click", e => {

    const card = e.target.closest(".course-card");

    if (!card) return;

    selectCourse(card);
});

// ---------- Keyboard Interaction ----------

courseGrid.addEventListener("keydown", e => {

    const card = e.target.closest(".course-card");

    if (!card) return;

    // Enter or Space selects the course
    if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        selectCourse(card);
    }
});