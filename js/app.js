import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./revealCells.js";
import { renderGame } from "./render.js";
import { ableToggleTheme } from "./utils.js";

function handleClick(event, matrix, row, col, bombQuantity) {
    const cell = event
        ? event.target
        : document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (!cell.classList.contains("cover") || endGame) return;

    if (placeFlags) {
        placeFlag(event);
        return;
    }

    if (cell.textContent === "🚩") return;

    revealedCells++;
    cell.classList.remove("cover");
    const cellValue = matrix[row][col];

    if (checkEndGame(cell, cellValue, revealedCells, matrix, bombQuantity))
        return;

    if (cellValue === 0) {
        revealNextCells(matrix, row, col, handleClick, bombQuantity);
    }

    cell.textContent = cellValue || "";
}

function checkEndGame(cell, cellValue, revealedCells, matrix, bombQuantity) {
    if (cellValue === "x") {
        cell.textContent = "💣";
        endGame = true;
        setTimeout(() => {
            revealBombs(false);
        }, 800);
        return true;
    }

    if (revealedCells === matrix.length * matrix[0].length - bombQuantity) {
        endGame = true;
        revealBombs(true);
        return true;
    }
}

function placeFlag(event) {
    event.preventDefault();
    const cell = event.target;

    if (!cell.classList.contains("cover") || endGame) return;

    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
        cell.textContent = "";
        return;
    }

    cell.classList.add("flag");
    cell.textContent = "🚩";
}

const flagToggleButton = document.getElementById("flag-toggle");
flagToggleButton.addEventListener("click", () => {
    placeFlags = !placeFlags;

    flagToggleButton.style.backgroundColor = placeFlags
        ? "var(--border-color)"
        : "transparent";
});

let endGame = false;
let placeFlags = false;
let revealedCells = 0;

function main() {
    const toggleButton = document.getElementById("theme-toggle");
    ableToggleTheme(toggleButton);

    const bombQuantity = 40;
    const matrix = createMatrix(16, 16, bombQuantity);

    const renderSpace = document.getElementById("render-space");
    renderGame(matrix, renderSpace, handleClick, placeFlag, bombQuantity);

    renderSpace.addEventListener("click", (event) => {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        handleClick(event, matrix, row, col, bombQuantity);
    });

    renderSpace.addEventListener("contextmenu", (event) => {
        placeFlag(event);
    });
}

main();
