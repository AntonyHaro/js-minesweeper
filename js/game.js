import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./revealCells.js";
import { renderGame } from "./render.js";
import { ableToggleTheme } from "./utils.js";
import directions from "./constants/directions.js";

function numberClick(matrix, row, col, bombQuantity) {
    let nextFlags = 0;

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

        if (
            document.querySelector(
                `.cell[data-row="${newRow}"][data-col="${newCol}"]`
            ).textContent == "🚩"
        ) {
            nextFlags++;
        }
    }

    if (
        document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
            .textContent == nextFlags
    ) {
        revealNextCells(matrix, row, col, handleClick, bombQuantity);
    }
}

function handleClick(event, matrix, row, col, bombQuantity) {
    const cell = event
        ? event.target
        : document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

    if (cell.innerHTML.includes("div")) {
        return;
    }

    if (!"".includes(cell.innerHTML) && event !== null && !endGame) {
        numberClick(matrix, row, col, bombQuantity);
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

function toggleFlagMode() {
    placeFlags = !placeFlags;
    flagToggleButton.className = placeFlags ? "flags-on" : "";
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;

    let start = Date.now();

    timer = setInterval(() => {
        console.log(timer);

        if (endGame) {
            stopTimer();
            return;
        }

        elapsedTime = Date.now() - start;
        timerDisplay.textContent = `Game time: ${
            (elapsedTime / 1000).toFixed(2) + "s"
        }`;
    }, 100);
}

function stopTimer() {
    clearInterval(timer);
    console.log(`Elapsed time: ${elapsedTime / 1000} seconds`);
}

let endGame = false;
let placeFlags = false;
let revealedCells = 0;
let elapsedTime = 0;
let timer;
let isTimerRunning = false;
const renderSpace = document.getElementById("render-space");
const timerDisplay = document.getElementById("timer-display");
const gameDifficulty = localStorage.getItem("gameDifficulty");
const flagToggleButton = document.getElementById("flag-toggle");
const themeToggleButton = document.getElementById("theme-toggle");

function main() {
    let bombQuantity;
    let matrix;

    switch (gameDifficulty) {
        case "easy":
            bombQuantity = 10;
            matrix = createMatrix(9, 9, bombQuantity);
            break;
        case "medium":
            bombQuantity = 40;
            matrix = createMatrix(16, 16, bombQuantity);
            break;
        case "hard":
            bombQuantity = 99;
            matrix = createMatrix(16, 30, bombQuantity);
            break;
        default:
            bombQuantity = 40;
            matrix = createMatrix(16, 16, bombQuantity);
    }

    renderGame(matrix, renderSpace, handleClick, placeFlag, bombQuantity);

    renderSpace.addEventListener("click", (event) => {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        handleClick(event, matrix, row, col, bombQuantity);
    });

    renderSpace.addEventListener("click", startTimer, { once: true });

    renderSpace.addEventListener("contextmenu", (event) => {
        placeFlag(event);
    });

    flagToggleButton.addEventListener("click", toggleFlagMode);
    ableToggleTheme(themeToggleButton);
}

main();
