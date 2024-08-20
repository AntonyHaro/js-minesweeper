import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./revealCells.js";
import { renderGame } from "./render.js";
import { toggleTheme } from "./support.js";

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

    cell.classList.remove("cover");


    if (document.querySelectorAll(".cover").length == bombQuantity) {
        console.log("Win")
    }

    const cellValue = matrix[row][col];

    cell.innerHTML = cellValue === "x" ? "💣" : cellValue || "";

    switch (cellValue) {
        case "x":
            endGame = true;
            setTimeout(() => {
                revealBombs(matrix);
            }, 800);
            return;
        case 0:
            revealNextCells(matrix, row, col, handleClick, bombQuantity);
            return;
    }
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
    toggleTheme(toggleButton);

    const bombQuantity = 10;

    const matrix = createMatrix(9, 9, bombQuantity);
    console.log(matrix);

    const renderSpace = document.getElementById("render-space");
    renderGame(matrix, renderSpace, handleClick, placeFlag, bombQuantity);
}

main();
