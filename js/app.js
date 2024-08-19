import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./revealCells.js";
import { renderGame } from "./render.js";
import { toggleTheme } from "./support.js";

function handleClick(event, matrix, row, col) {
    let cell;
    event
        ? (cell = event.target)
        : (cell = document.querySelector(
              `.cell[data-row="${row}"][data-col="${col}"]`
          ));

    if (!cell.classList.contains("cover") || endGame || cell.innerHTML === "🚩")
        return;

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

const toggleButton = document.getElementById("theme-toggle");
toggleTheme(toggleButton);

const matrix = createMatrix(16, 16, 40);
console.log(matrix);

const renderSpace = document.getElementById("render-space");
renderGame(matrix, renderSpace, handleClick, placeFlag);

let placeFlags = false;

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
