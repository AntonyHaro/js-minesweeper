import { ableToggleTheme } from "./utils.js";

function renderRecords() {
    const createElement = (tag, className, text) => {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        return element;
    };

    const gameRecords = JSON.parse(localStorage.getItem("gameRecords")) || [];

    if (gameRecords.length <= 0) {
        noRecords.textContent = "No records were found, try playing a game!";
        return;
    }

    recordsContainer.innerHTML = "";
    gameRecords.forEach((record) => {
        const recordElement = createElement("div", "record");
        const result = createElement(
            "h2",
            record.result ? "win" : "defeat",
            record.result ? "Win" : "Defeat"
        );
        const difficulty = createElement("p", "difficulty", record.difficulty);
        const date = createElement("p", "date", record.date);
        const time = createElement("h2", "time", record.time);

        recordElement.append(result, difficulty, date, time);
        recordsContainer.appendChild(recordElement);

        record.result ? wins++ : defeats++;
    });

    winsContainer.textContent = `${wins} Wins`;
    defeatsContainer.textContent = `${defeats} Defeats`;
}

let wins = 0;
let defeats = 0;

const recordsContainer = document.getElementById("records");
const noRecords = document.getElementById("no-records");
const winsContainer = document.getElementById("wins");
const defeatsContainer = document.getElementById("defeats");
const toggleButton = document.getElementById("theme-toggle");

renderRecords();
ableToggleTheme(toggleButton);
