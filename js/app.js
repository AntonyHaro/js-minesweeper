import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./revealCells.js";
import { renderGame } from "./render.js";
import { ableToggleTheme } from "./utils.js";

function numberClick(matrix, row, col, bombQuantity) {
    let nextFlags = 0
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    for (const [dl, dc] of directions) {
        const newRow = row + dl;
        const newCol = col + dc;
        if (
            newRow < 0 ||
            newRow > matrix.length - 1 ||
            newCol < 0 ||
            newCol > matrix[0].length - 1
        ) {
            continue;
        }
        
        if (document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`).textContent == "🚩") {
            nextFlags++ // todo código acima serve pra contar quantas bandeiras tem ao redor, incrementando nessa variável
        }
    }
    if (document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).textContent == nextFlags) {
        revealNextCells(matrix, row, col, handleClick, bombQuantity) // aqui ele compara se o número clicado é igual a quantidade de bandeiras, se sim, faz o reveal como se fosse um 0
    }
}

function handleClick(event, matrix, row, col, bombQuantity) {
    const cell = event
        ? event.target
        : document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (cell.innerHTML.includes("div")) {
        return
    } // notei que quando uma parte do campo que não é célula é clicada, ele manda um palavrão no cell, fiz isso pra já cortar isso

    if (!"".includes(cell.innerHTML) && event !== null && !endGame) {
        numberClick(matrix, row, col, bombQuantity) //função pra clicar no número e revelar as bombas ao redor
    }

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

    const bombQuantity = 10;
    const matrix = createMatrix(9, 9, bombQuantity);

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
