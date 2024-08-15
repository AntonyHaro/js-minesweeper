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
    for (let i = 0; i < bombs; i++) {
        let row = Math.floor(Math.random() * matrix.length);
        let col = Math.floor(Math.random() * matrix.length);

        while (matrix[row][col] == "x") {
            row = Math.floor(Math.random() * matrix.length);
            col = Math.floor(Math.random() * matrix.length);
        }
        matrix[row][col] = "x";
        getNextCells(matrix, row, col);
    }
}

function getNextCells(matrix, row, col) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const nextCells = [];

    const directions = [
        [-1, -1], // cima-esquerda
        [-1, 0], // cima
        [-1, 1], // cima-direita
        [0, -1], // esquerda
        [0, 1], // direita
        [1, -1], // baixo-esquerda
        [1, 0], // baixo
        [1, 1], // baixo-direita
    ];

    for (const [dl, dc] of directions) {
        const newRow = row + dl;
        const newCol = col + dc;

        if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            matrix[newRow][newCol] != "x"
        ) {
            const nextCell = matrix[newRow][newCol];

            matrix[newRow][newCol] = nextCell + 1;
        }
    }
}

function renderGame(matrix) {
    const createElement = (tag, className, text) => {
        const element = document.createElement(tag);
        className ? (element.className = className) : undefined;
        element.textContent = text;
        return element;
    };

    matrix.forEach((row, row_index) => {
        row.forEach((col, col_index) => {
            const cell =
                matrix[row_index][col_index] === "x"
                    ? createElement(
                          "div",
                          "cell bomb",
                          matrix[row_index][col_index]
                      )
                    : createElement(
                          "div",
                          "cell",
                          matrix[row_index][col_index]
                      );

            renderSpace.appendChild(cell);
        });
    });
}

const renderSpace = document.getElementById("render-space");
const matrix = createEmptyMatrix(9, 9);
addBombs(matrix, 12);

console.log("Matriz gerada:", matrix);

renderGame(matrix);
