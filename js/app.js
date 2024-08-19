import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./utils.js";
import { renderGame } from "./render.js";

function handleClick(event, matrix, row, col) {
    let cell;

    event
        ? (cell = event.target)
        : (cell = document.querySelector(
              `.cell[data-row="${row}"][data-col="${col}"]`
          ));

    if (!cell.classList.contains("cover") || endGame) return;

    if (placeFlags) {
        placeFlag(event);
        return;
    }

    cell.classList.remove("cover");
    cell.classList.contains("flag") ? cell.classList.remove("flag") : null;

    const cellValue = matrix[row][col];

    cell.innerHTML = cellValue === "x" ? "💣" : cellValue || "";
    cellValue === 0 ? revealNextCells(matrix, row, col, handleClick) : null;

    if (cellValue === "x") {
        endGame = true;
        setTimeout(() => {
            revealBombs(matrix);
        }, 800);
    }
}

function placeFlag(event) {
    event.preventDefault();
    const cell = event.target;

    if (!cell.classList.contains("cover") || endGame) return;

    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
        cell.innerHTML = "";
    } else {
        cell.classList.add("flag");
        cell.innerHTML = "🚩";
    }
}

let endGame = false;

const renderSpace = document.getElementById("render-space");

const matrix = createMatrix(16, 16, 40);
console.log(matrix);

renderGame(matrix, renderSpace, handleClick, placeFlag);

let placeFlags = false;

const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        themeToggleButton.innerHTML = "🌞";
        return;
    }
    document.body.classList.add("dark-mode");
    themeToggleButton.innerHTML = "🌙";
});

const flagToggleButton = document.getElementById("flag-toggle");
flagToggleButton.addEventListener("click", () => {
    if (!placeFlags) {
        placeFlags = true;
        flagToggleButton.style.backgroundColor = "var(--cell-background)";
        return;
    }
    placeFlags = false;
    flagToggleButton.style.backgroundColor = "transparent";
});
