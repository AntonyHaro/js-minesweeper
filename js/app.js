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

            cell.addEventListener("click", () =>
                handleClick(matrix, rowIndex, colIndex)
            );

            cell.addEventListener("contextmenu", (event) => {
                handleRightClick(event);
            });

            renderSpace.appendChild(cell);
        });
    });
}

function handleClick(matrix, row, col) {
    const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
    );

    if (!cell.classList.contains("cover") || fimJogo) return;

    cell.classList.remove("cover");
    const cellValue = matrix[row][col];
    cell.innerHTML = cellValue === "x" ? "💣" : cellValue || "";

    if (cellValue === 0) {
        revealNextCells(matrix, row, col, handleClick);
    }

    if (cellValue === "x") {
        fimJogo = true;
        setTimeout(() => {
            revealBombs(matrix);
        }, 800);
    }
}

function handleRightClick(event) {
    event.preventDefault();
    const cell = event.target;

    if (!cell.classList.contains("cover") || fimJogo) return;

    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
        cell.innerHTML = ""; 
    } else {
        cell.classList.add("flag");
        cell.innerHTML = "🚩"; 
    }
}

let fimJogo = false;

const renderSpace = document.getElementById("render-space");

const matrix = createMatrix(16, 16, 40);
console.log(matrix);

renderGame(matrix, renderSpace);
