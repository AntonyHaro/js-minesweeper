export const revealNextCells = (
    matrix,
    row,
    col,
    handleClick,
    bombQuantity
) => {
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
        handleClick("", matrix, newRow, newCol, bombQuantity);
    }
};

export const revealBombs = (win) => {
    const bombCells = document.querySelectorAll(".bomb");
    const title = document.querySelector("h1");

    if (!win) {
        title.innerHTML = "☠️ Minesweeper ☠️"
        bombCells.forEach((bombCell) => {
            bombCell.className = "cell bomb";
            bombCell.innerHTML = "💣";
        });
        return;
    }

    title.innerHTML = "🏆 Minesweeper 🏆"
    title.style.color = "var(--win-cell-background)";
    bombCells.forEach((bombCell) => {
        bombCell.className = "cell win";
        bombCell.innerHTML = "😀";
    });
};
