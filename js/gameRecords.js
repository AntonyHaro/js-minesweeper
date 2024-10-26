import { ableToggleTheme } from "./utils.js";

function renderRecords() {
    const createElement = (tag, className, text) => {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        return element;
    };

    wins = 0;
    defeats = 0;
    recordsContainer.innerHTML = "";

    if (gameRecords.length <= 0) {
        noRecords.textContent = "No records were found, try playing a game!";
        return;
    }

    noRecords.textContent = "";
    gameRecords.forEach((record) => {
        const recordElement = createElement("div", "record");
        recordElement.dataset.result = record.result
            ? "wins-filter"
            : "defeats-filter";
        recordElement.dataset.difficulty = record.difficulty;

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
    filterResults();
}

let wins = 0;
let defeats = 0;

const gameRecords = JSON.parse(localStorage.getItem("gameRecords")) || [];
const recordsContainer = document.getElementById("records");
const noRecords = document.getElementById("no-records");
const winsContainer = document.getElementById("wins");
const defeatsContainer = document.getElementById("defeats");
const toggleButton = document.getElementById("theme-toggle");
const checkboxes = document.querySelectorAll(".checkbox-filter");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            checkboxes.forEach((item) => {
                if (item !== this) {
                    item.checked = false;
                }
            });
        }
        filterResults();
    });
});

function filterResults() {
    const filterOption = Array.from(checkboxes).find((cb) => cb.checked)?.id;
    const recordElements = recordsContainer.querySelectorAll(".record");

    recordElements.forEach((item) => {
        if (filterOption === "all-filter" || !filterOption) {
            item.style.display = "flex";
        } else {
            const matchesFilter = item.dataset.result === filterOption;
            item.style.display = matchesFilter ? "flex" : "none";
        }
    });
}

renderRecords();
ableToggleTheme(toggleButton);
