import { courses } from "./data.js";

const courseGrid = document.querySelector(".course-grid");
const loading = document.getElementById("loading");

// -----------------------------
// STEP 45
// Promise Version
// -----------------------------
function fetchUser(id) {

    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json());

}

fetchUser(1)
    .then(user => {
        console.log("Promise:", user.name);
    });

// -----------------------------
// STEP 46
// Async / Await Version
// -----------------------------
async function fetchUserAsync(id) {

    try {

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const user = await response.json();

        console.log("Async:", user.name);

    }
    catch (error) {

        console.error(error);

    }

}

fetchUserAsync(2);

// -----------------------------
// STEP 47
// Simulate Network Delay
// -----------------------------
function fetchAllCourses() {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(courses);

        }, 1000);

    });

}

// -----------------------------
// Render Courses
// -----------------------------
function renderCourses(courseArray) {

    courseGrid.innerHTML = "";

    courseArray.forEach(course => {

        const card = document.createElement("article");

        card.className = "course-card";

        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.code}</p>
            <p>${course.credits} Credits</p>
            <p>Grade : ${course.grade}</p>
        `;

        courseGrid.appendChild(card);

    });

}

// -----------------------------
// STEP 48
// Loading State
// -----------------------------
async function showCourses() {

    loading.textContent = "Loading courses...";

    const data = await fetchAllCourses();

    loading.textContent = "";

    renderCourses(data);

}

showCourses();

// -----------------------------
// STEP 49
// Promise.all()
// -----------------------------
Promise.all([
    fetchUser(1),
    fetchUser(2)
]).then(users => {

    console.log("Promise.all():");

    console.log(users[0].name);

    console.log(users[1].name);

});
// ======================================
// TASK 2 : Fetch API + Error Handling
// Steps 50 - 54
// ======================================

const loadPostsBtn = document.getElementById("load-posts");
const retryBtn = document.getElementById("retry-btn");
const notifications = document.getElementById("notifications");
const apiStatus = document.getElementById("api-status");

// ----------------------------
// Step 50
// Generic Fetch Function
// ----------------------------

async function apiFetch(url){

    const response = await fetch(url);

    if(!response.ok){
        throw new Error(
            "Unable to load data. Status : " +
            response.status
        );
    }

    return await response.json();

}

// ----------------------------
// Step 51 + 52
// Load Notifications
// ----------------------------

async function loadNotifications(){

    notifications.innerHTML = "";

    apiStatus.style.color = "blue";
    apiStatus.textContent = "Loading...";

    retryBtn.style.display = "none";

    try{

        const posts = await apiFetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        apiStatus.textContent = "";

        posts.forEach(post=>{

            const card = document.createElement("div");

            card.className = "notification";

            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;

            notifications.appendChild(card);

        });

    }

    catch(error){

        apiStatus.style.color = "red";

        apiStatus.textContent = error.message;

        retryBtn.style.display = "inline-block";

    }

}

loadPostsBtn.addEventListener(
    "click",
    loadNotifications
);

// ----------------------------
// Step 53
// 404 Error Demo
// ----------------------------

async function test404(){

    try{

        await apiFetch(
            "https://jsonplaceholder.typicode.com/nonexistent"
        );

    }

    catch(error){

        console.log(
            "404 handled successfully"
        );

    }

}

test404();

// ----------------------------
// Step 54
// Retry Button
// ----------------------------

retryBtn.addEventListener(
    "click",
    loadNotifications
);
// ======================================
// TASK 3 : Axios
// Steps 55 - 59
// ======================================

// Step 58 - Axios Request Interceptor
axios.interceptors.request.use(config => {

    console.log("API call started:", config.url);

    return config;

});

// Step 56 - Axios Version of apiFetch
async function apiFetchAxios(url) {

    const response = await axios.get(url);

    return response.data;

}

// Step 57 - Axios with Query Parameters
async function loadAxiosPosts() {

    try {

        const posts = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    userId: 1
                }
            }
        );

        console.log("Axios Posts:");

        console.log(posts.data);

    }
    catch(error){

        console.error(error);

    }

}

loadAxiosPosts();

/*

=========================================
FETCH vs AXIOS

1. Fetch is built into the browser.
   Axios is an external library.

2. Fetch requires response.ok checking.
   Axios automatically throws errors for
   HTTP status codes like 404 and 500.

3. Fetch requires response.json().
   Axios automatically converts JSON
   into JavaScript objects.

=========================================

*/