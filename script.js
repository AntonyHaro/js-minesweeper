const createEmptyMatrix = (rows, cols) => {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
};

function addBombs(matrix, bombs) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let i = 0; i < bombs; i++) {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * cols);

        while (matrix[row][col] === "x") {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * cols);
        }
        matrix[row][col] = "x";
        getNextCells(matrix, row, col);
    }
}

function getNextCells(matrix, row, col) {
    const rows = matrix.length;
    const cols = matrix[0].length;

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
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            matrix[newRow][newCol] !== "x"
        ) {
            matrix[newRow][newCol] = (matrix[newRow][newCol] || 0) + 1;
        }
    }
}

function renderGame(matrix) {
    const createElement = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        element.textContent = text;
        return element;
    };

    renderSpace.style.gridTemplateRows = `repeat(${matrix.length}, 40px)`;
    renderSpace.style.gridTemplateColumns = `repeat(${matrix[0].length}, 40px)`;

    matrix.forEach((row, row_index) => {
        row.forEach((col, col_index) => {
            const cell =
                matrix[row_index][col_index] === "x"
                    ? createElement(
                          "div",
                          "cell bomb cover",
                      )
                    : createElement(
                          "div",
                          "cell cover",
                      );

            cell.addEventListener("click", (event) =>
                handleClick(event, matrix[row_index][col_index])
            );

            renderSpace.appendChild(cell);
        });
    });
}

function handleClick(event, cellValue) {
    const cell = event.target;
    console.log(cellValue)
    cell.innerHTML = cellValue
    cell.classList.remove("cover");
    console.log(cell);
}

const renderSpace = document.getElementById("render-space");
const matrix = createEmptyMatrix(9, 9);
addBombs(matrix, 12);

console.log("Matriz gerada:", matrix);

renderGame(matrix);
