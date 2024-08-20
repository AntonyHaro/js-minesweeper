export const renderGame = (
    matrix,
    renderSpace,
    handleClick,
    placeFlag,
    bombQuantity
) => {
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

            cell.addEventListener("click", (event) =>
                handleClick(event, matrix, rowIndex, colIndex, bombQuantity)
            );

            cell.addEventListener("contextmenu", (event) => {
                placeFlag(event);
            });

            renderSpace.appendChild(cell);
        });
    });
};
