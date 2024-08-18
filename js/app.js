import { createMatrix } from "./matrix.js"

function renderGame(matrix, renderSpace) {
    const createElement = (tag, className, id) => {
        const element = document.createElement(tag);
        element.className = className;
        element.id = id;
        return element;
    };

    renderSpace.style.gridTemplateRows = `repeat(${matrix.length}, 40px)`;
    renderSpace.style.gridTemplateColumns = `repeat(${matrix[0].length}, 40px)`;

    matrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const cell =
                matrix[rowIndex][colIndex] === "x"
                    ? createElement(
                          "div",
                          "cell bomb cover",
                          `${rowIndex}_${colIndex}`
                      )
                    : createElement(
                          "div",
                          "cell cover",
                          `${rowIndex}_${colIndex}`
                      );

            cell.addEventListener("click", () =>
                handleClick(matrix, rowIndex, colIndex)
            );
            renderSpace.appendChild(cell);
        });
    });
}

function handleClick(matrix, row, col) {
    const cell = document.getElementById(`${row}_${col}`);
    if (!cell.classList.contains("cover") || fimJogo) return;

    cell.classList.remove("cover");
    const cellValue = matrix[row][col];
    cell.innerHTML = cellValue === "x" ? "💣" : cellValue || "";

    if (cellValue === 0) {
        revealNextCells(matrix, row, col);
    }

    if (cellValue === "x") {
        fimJogo = true;
        setTimeout(() => {
            revealBombs(matrix);
        }, 800);
    }
}

function revealNextCells(matrix, row, col) {
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
        handleClick(matrix, newRow, newCol);
    }
}

function revealBombs(matrix) {
    matrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (matrix[rowIndex][colIndex] === "x") {
                const cell = document.getElementById(`${rowIndex}_${colIndex}`);
                if (cell) {
                    cell.innerHTML = "💣";
                    cell.classList.remove("cover");
                }
            }
        });
    });
}

let fimJogo = false;

const renderSpace = document.getElementById("render-space");

const matrix = createMatrix(9, 9, 12);
console.log(matrix);

renderGame(matrix, renderSpace);
