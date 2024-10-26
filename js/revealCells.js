import directions from "./constants/directions.js";

export const revealNextCells = (
    matrix,
    row,
    col,
    handleClick,
    bombQuantity
) => {
    for (let i = 0; i < directions.length; i++) {
        const [dl, dc] = directions[i];
        const newRow = row + dl;
        const newCol = col + dc;

        if (
            newRow >= 0 &&
            newRow < matrix.length &&
            newCol >= 0 &&
            newCol < matrix[0].length
        ) {
            handleClick(null, matrix, newRow, newCol, bombQuantity);
        }
    }
};

export const revealBombs = (win) => {
    const bombCells = document.querySelectorAll(".bomb");
    const title = document.querySelector("h1");

    title.textContent = win ? "🏆 Minesweeper 🏆" : title.textContent;
    title.style.color = win ? "var(--win-cell-background)" : "";

    bombCells.forEach((bombCell) => {
        bombCell.className = `cell ${win ? "win" : "bomb"}`;
        bombCell.textContent = win ? "😀" : "💣";
    });
};
