export const renderGame = (
    matrix,
    renderSpace,
    handleClick,
    placeFlag,
    bombQuantity
) => {
    const createCell = (tag, className, rowIndex, colIndex) => {
        const element = document.createElement(tag);
        element.className = className;
        element.dataset.row = rowIndex;
        element.dataset.col = colIndex;
        return element;
    };

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

            cell.addEventListener("click", (event) =>
                handleClick(event, matrix, rowIndex, colIndex, bombQuantity)
            );
            cell.addEventListener("contextmenu", placeFlag);

            renderSpace.appendChild(cell);
        });
    });
};
