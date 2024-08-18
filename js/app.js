import { createMatrix } from "./matrix.js";
import { revealNextCells, revealBombs } from "./utils.js";

function renderGame(matrix, renderSpace) {
    const createElement = (tag, className, row, col) => {
        const element = document.createElement(tag);
        element.className = className;
        element.dataset.row = row;
        element.dataset.col = col;
        return element;
    };

    renderSpace.style.gridTemplateRows = `repeat(${matrix.length}, 1fr)`;
    renderSpace.style.gridTemplateColumns = `repeat(${matrix[0].length}, 1fr)`;

    matrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const cell =
                matrix[rowIndex][colIndex] === "x"
                    ? createElement(
                          "div",
                          "cell bomb cover",
                          rowIndex,
                          colIndex
                      )
                    : createElement("div", "cell cover", rowIndex, colIndex);

            cell.addEventListener("click", (event) =>
                handleClick(event, matrix, rowIndex, colIndex)
            );

            cell.addEventListener("contextmenu", (event) => {
                placeFlag(event);
            });

            renderSpace.appendChild(cell);
        });
    });
}

function handleClick(event, matrix, row, col) {
    let cell;
    if (event) {
        cell = event.target;
    } else {
        cell = document.querySelector(
            `.cell[data-row="${row}"][data-col="${col}"]`
        );
    }

    if (!cell.classList.contains("cover") || endGame) return;

    if (placeFlags) {
        placeFlag(event);
        return;
    }

    cell.classList.remove("cover");
    cell.classList.contains("flag") ? cell.classList.remove("flag") : null;

    const cellValue = matrix[row][col];
    cell.innerHTML = cellValue === "x" ? "💣" : cellValue || "";

    if (cellValue === 0) {
        revealNextCells(matrix, row, col, handleClick);
    }

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

renderGame(matrix, renderSpace);

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
        flagToggleButton.classList.add("place-flags-on");
        return;
    }
    placeFlags = false;
    flagToggleButton.classList.remove("place-flags-on");
});
