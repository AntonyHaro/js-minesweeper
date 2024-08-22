export const ableToggleTheme = (toggleButton) => {
    toggleButton.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        toggleButton.innerHTML = isDarkMode ? "🌙" : "🌞";
    });
};

export const createCell = (tag, className, rowIndex, colIndex) => {
    const element = document.createElement(tag);
    element.className = className;
    element.dataset.row = rowIndex;
    element.dataset.col = colIndex;
    return element;
};
