export const createMatrix = (rows, cols, bombs) => {
    const matrix = createEmptyMatrix(rows, cols);
    addBombs(matrix, bombs);
    return matrix;
};

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

const addBombs = (matrix, bombs) => {
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
        updateAdjacentCells(matrix, row, col);
    }
};

const updateAdjacentCells = (matrix, row, col) => {
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
};
