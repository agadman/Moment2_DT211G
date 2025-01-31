document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});

let courses = [];

window.onload = () => {
    loadCourses();
}

async function loadCourses() {
    try {
        const response = await fetch ("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("Fel vid anslutning till data.")
        }
        
        courses = await response.json();
        printCourses(courses);

    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Fel vid anslutning - prova igen vid ett senare tillfälle!</p>";
    }
}

function printCourses(data) {
    const table = document.querySelector("#table");

    //Rensar DOM
    const dataRows = table.querySelectorAll(".tableData");
    dataRows.forEach(row => row.remove());

    // Loopar genom kursdatan och skapar rows
    data.forEach(course => {
        // Skapar en ny rad (tr)
        const row = document.createElement("tr");
        row.classList.add("tableData"); // Lägger till en klass

        // Skapar celler (td) med kursinformation
        const codeCell = document.createElement("td");
        codeCell.textContent = course.code;  

        const nameCell = document.createElement("td");
        nameCell.textContent = course.coursename;  

        const progressionCell = document.createElement("td");
        progressionCell.textContent = course.progression;  

        // Lägger till cellerna i raden
        row.appendChild(codeCell);
        row.appendChild(nameCell);
        row.appendChild(progressionCell);

        // Lägger till raden i tabellen
        table.appendChild(row);
    });
}