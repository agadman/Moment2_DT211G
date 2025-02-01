document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    loadCourses();
});

let courses = [];

async function loadCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("Fel vid anslutning till data.");
        }
        
        courses = await response.json();
        printCourses(courses);

    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Fel vid anslutning - prova igen vid ett senare tillfälle!</p>";
    }
}

function printCourses(data) {
    const codeColumn = document.querySelector("#codeColumn");
    const nameColumn = document.querySelector("#nameColumn");
    const progressionColumn = document.querySelector("#progressionColumn");

    codeColumn.innerHTML = "";
    nameColumn.innerHTML = "";
    progressionColumn.innerHTML = "";

    data.forEach(course => {
        const codeDiv = document.createElement("div");
        codeDiv.classList.add("item");
        codeDiv.textContent = course.code;
        codeColumn.appendChild(codeDiv);

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("item");
        nameDiv.textContent = course.coursename;
        nameColumn.appendChild(nameDiv);

        const progressionDiv = document.createElement("div");
        progressionDiv.classList.add("item");
        progressionDiv.textContent = course.progression;
        progressionColumn.appendChild(progressionDiv);
    });

    document.querySelector("#sortName").addEventListener("click", () => {
        data.sort((a, b) => a.coursename < b.coursename ? -1 : 1);
        printSorted("nameColumn", "coursename");
    });
    document.querySelector("#sortProgression").addEventListener("click", () => {
        data.sort((a, b) => a.progression < b.progression ? -1 : 1);
        printSorted("progressionColumn", "progression");
    });
    document.querySelector("#sortCode").addEventListener("click", () => {
        data.sort((a, b) => a.code < b.code ? -1 : 1);
        printSorted("codeColumn", "code");
    });
}

function printSorted(columnId, key) {
    const column = document.querySelector(`#${columnId}`);
    column.innerHTML = ""; 

    courses.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.textContent = course[key];
        column.appendChild(div);
    });
}