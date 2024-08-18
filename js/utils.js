export const revealNextCells = (matrix, row, col, handleClick) => {
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
        handleClick("", matrix, newRow, newCol);
    }
};

export const revealBombs = (matrix) => {
    matrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (matrix[rowIndex][colIndex] === "x") {
                const cell = document.querySelector(
                    `.cell[data-row="${rowIndex}"][data-col="${colIndex}"]`
                );
                if (cell) {
                    cell.innerHTML = "💣";
                    cell.className = "cell bomb";
                }
            }
        });
    });
};
