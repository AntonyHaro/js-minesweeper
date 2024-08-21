import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./revealCells.js";
import { renderGame } from "./render.js";
import { ableToggleTheme } from "./support.js";

function handleClick(event, matrix, row, col, bombQuantity) {
    let cell = event
        ? event.target
        : document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (!cell.classList.contains("cover") || endGame) return;

    if (placeFlags) {
        placeFlag(event);
        return;
    }

    if (cell.innerHTML === "🚩") return;

    
    if (document.querySelectorAll(".cover").length == bombQuantity) {
        endGame = true;
        console.log("Win");
    }
    
    cell.classList.remove("cover");
    
    const cellValue = matrix[row][col];
    cell.innerHTML = cellValue === "x" ? "💣" : cellValue || "";

    if (cellValue === "x") {
        endGame = true;
        setTimeout(() => {
            revealBombs(matrix);
        }, 800);
        return;
    }

    revealNextCells(matrix, row, col, handleClick, bombQuantity);
}

function placeFlag(event) {
    event.preventDefault();
    const cell = event.target;

    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
        cell.innerHTML = "";
        return;
    }

    cell.classList.add("flag");
    cell.innerHTML = "🚩";
}

const flagToggleButton = document.getElementById("flag-toggle");
flagToggleButton.addEventListener("click", () => {
    placeFlags = !placeFlags;

    flagToggleButton.style.backgroundColor = placeFlags
        ? "var(--cell-background)"
        : "transparent";
});

let endGame = false;
let placeFlags = false;

function main() {
    const toggleButton = document.getElementById("theme-toggle");
    ableToggleTheme(toggleButton);

    const bombQuantity = 40;

    const matrix = createMatrix(16, 16, bombQuantity);
    console.log(matrix);

    const renderSpace = document.getElementById("render-space");
    renderGame(matrix, renderSpace, handleClick, placeFlag, bombQuantity);
}

main();
