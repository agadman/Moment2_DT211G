document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    if (document.body.contains(document.querySelector("#sortCode"))) {
        loadCourses(); 
    }
});

let courses = [];
let sortOrder = { coursename: 1, progression: 1, code: 1 };

async function loadCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("Fel vid anslutning till data.");
        }
        
        courses = await response.json();
        printCourses(courses);

        document.querySelector("#search").addEventListener("input", filterData);
    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Fel vid anslutning - prova igen vid ett senare tillfälle!</p>";
    }
}

function printCourses(data) {
    const coursesTableBody = document.querySelector("#coursesTable");
    coursesTableBody.innerHTML = "";

    data.forEach(course => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
        `;

        coursesTableBody.appendChild(row);
    });

    document.querySelector("#sortName").addEventListener("click", () => toggleSort("coursename"));
    document.querySelector("#sortProgression").addEventListener("click", () => toggleSort("progression"));
    document.querySelector("#sortCode").addEventListener("click", () => toggleSort("code"));
}

function toggleSort(key) {
    courses.sort((a, b) => (a[key] > b[key] ? 1 : -1)); 
    printCourses(courses);
}

function filterData() {
    const searchPhrase = document.querySelector("#search").value.toLowerCase(); 
    const filteredCourses = courses.filter(course =>
        course.coursename.toLowerCase().includes(searchPhrase) || 
        course.code.toLowerCase().includes(searchPhrase)   
    );
    printCourses(filteredCourses);
}
