import { createCell } from "./utils.js";

export const renderGame = (matrix, renderSpace) => {
    const fragment = document.createDocumentFragment();

    renderSpace.style.gridTemplateRows = `repeat(${matrix.length}, 1fr)`;
    renderSpace.style.gridTemplateColumns = `repeat(${matrix[0].length}, 1fr)`;

    matrix.forEach((row, rowIndex) => {
        row.forEach((cellValue, colIndex) => {
            const isBomb = cellValue === "x";
            const cell = createCell(
                "div",
                `cell ${isBomb ? "bomb" : ""} cover`,
                rowIndex,
                colIndex
            );
            fragment.appendChild(cell);
        });
    });

    renderSpace.appendChild(fragment);
};
