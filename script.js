// script.js

// Updated exercises object
const exercises = {
    "Skala": ["A", "A#/Bb", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"],
    "Arpeggio": ["A", "A#/Bb", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"],
    "Intervaller": ["Lille Sekund", "Store Sekund", "Lille Terts", "Stor Terts", "Kvart", "Tritonus", "Kvint", "Lille Sekst", "Stor Sekst", "Lille Septim", "Stor Septim", "Oktav"],
    "Stykke A": ["Titel/Link"],
    "Stykke B": ["Titel/Link"],
    "Stykke C": ["Titel/Link"],
    "Lytte": ["Titel/Link:"],
    "Læse": ["Titel/Link:"]
}

document.addEventListener("DOMContentLoaded", function () {
    createWorkoutTable();
    createCategoryButtons();
    document.getElementById("equipment-select").addEventListener("change", updateExerciseButtons);
    updateExerciseButtons();
});

function createCategoryButtons() {
    const categoryButtons = document.getElementById("category-buttons");

    Object.keys(exercises).forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", function () {
            updateExerciseButtons(category);
        });
        categoryButtons.appendChild(button);
    });
}

// Modify the updateExerciseButtons function to pass both category and exercise
function updateExerciseButtons(category) {
    const exerciseButtons = document.getElementById("exercise-buttons");
    exerciseButtons.innerHTML = "";

    exercises[category].forEach(exercise => {
        const button = document.createElement("button");
        button.textContent = exercise;
        button.addEventListener("click", function () {
            addExerciseToPlan(category, exercise);
        });
        exerciseButtons.appendChild(button);
    });
}

function addExerciseToPlan(category, exercise) {
    const workoutTable = document.getElementById("workout-table");

    if (!workoutTable) {
        alert("Workout table not found.");
        return;
    }

    const row = workoutTable.insertRow(-1);

    for (let i = 0; i < 2; i++) { // Assuming 2 columns in the table (adjust if needed)
        const cell = row.insertCell(-1);
        cell.textContent = ""; // Initialize each cell as blank

        // Make all cells editable
        cell.contentEditable = true;
    }

    // Set category and exercise name in the first cell
    row.cells[0].textContent = `${category}: ${exercise}`;
}

function createWorkoutTable() {
    const workoutSection = document.getElementById("workout-section");
    const table = document.createElement("table");
    table.id = "workout-table";

    const headerRow = table.insertRow(0);
    headerRow.insertCell(0).textContent = "Øvelse";

    for (let i = 1; i <= 1; i++) { // title for subsequent cells
        const headerCell = headerRow.insertCell(i);
        headerCell.textContent = `Noter`;
    }

    workoutSection.appendChild(table);
}

function exportToHTML() {
    console.log("Exporting to HTML...");

    const workoutTable = document.getElementById("workout-table");

    if (!workoutTable) {
        alert("No workout plan to export.");
        return;
    }

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-GB', options).replace(/\//g, '-');

    let htmlContent = "<!DOCTYPE html>\n<html>\n<head>\n<title>Workout Plan</title>\n";
    htmlContent += "<style>\n";
    htmlContent += "body { font-family: Arial, sans-serif; }\n";
    htmlContent += "table { border-collapse: collapse; width: 100%; }\n";
    htmlContent += "th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }\n";
    htmlContent += "tr > :first-child { border: 1px solid #ddd; padding: 8px; width: 1%; white-space: nowrap; }\n";
    htmlContent += "</style>\n";
    htmlContent += "</head>\n<body>\n";

    htmlContent += `<h2 style='text-align: center;'>Workout: ${formattedDate}</h2>\n`;

    htmlContent += "<table>\n";

    for (let j = 0; j < workoutTable.rows.length; j++) {
        htmlContent += "<tr>\n";

        for (let i = 0; i < workoutTable.rows[j].cells.length; i++) {
            const cellContent = workoutTable.rows[j].cells[i].textContent || "";
            const tag = (j === 0) ? "th" : "td";
            htmlContent += `<${tag}>${cellContent}</${tag}>\n`;
        }

        htmlContent += "</tr>\n";
    }

    htmlContent += "</table>\n</body>\n</html>";

    downloadHTMLFile(htmlContent, formattedDate);
}

function downloadHTMLFile(content, formattedDate) {
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Øveplan ${formattedDate}.html`;
    a.click();
}
