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
                    ? createElement("div", "cell bomb cover", `${rowIndex}_${colIndex}`)
                    : createElement("div", "cell cover", `${rowIndex}_${colIndex}`);

            cell.addEventListener("click", () =>
                handleClick(matrix, rowIndex, colIndex, matrix[rowIndex][colIndex] || "")
            );
            renderSpace.appendChild(cell);
        });
    });
}

function handleClick(matrix, row, col, cellValue) {
    console.log(row, col);
    const cell = document.getElementById( `${row}_${col}`);
    if (!cell.classList.contains("cover") || fimJogo) return;
    cell.innerHTML = cellValue;
    cell.classList.remove("cover");

    if (cellValue === "") {
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
            if (newRow < 0 || newRow > (matrix.length - 1) || newCol < 0 || newCol > (matrix[0].length - 1)) {
                continue;
            }
            handleClick(matrix, newRow, newCol, matrix[newRow][newCol] || "");
        }
    }

    if (cellValue === "x") {
        fimJogo = true;
        revealBombs(matrix);
    }
}

function revealBombs(matrix) {
    matrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (matrix[rowIndex][colIndex] === "x") {
                const cell =
                    renderSpace.children[
                        rowIndex * matrix[0].length + colIndex
                    ];
                cell.innerHTML = "💣";
                revealBomb(cell);
            }
        });
    });
}

function revealBomb(bomb) {
    setTimeout(() => {
        bomb.classList.remove("cover");
    }, 800);
}

let fimJogo = false;

const renderSpace = document.getElementById("render-space");

const matrix = createEmptyMatrix(9, 9);
addBombs(matrix, 15);

renderGame(matrix, renderSpace);
