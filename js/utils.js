export const ableToggleTheme = (themeToggleButton) => {
    // Obtém o tema salvo e aplica o modo apropriado
    const savedTheme = localStorage.getItem("theme") || "dark";
    const isLightMode = savedTheme === "light";

    document.body.classList.toggle("light-mode", isLightMode);
    themeToggleButton.textContent = isLightMode ? "🌙" : "🌞";

    // Adiciona o evento de clique para alternar o tema
    themeToggleButton.addEventListener("click", () => {
        const isCurrentlyLightMode =
            document.body.classList.toggle("light-mode");
        themeToggleButton.textContent = isCurrentlyLightMode ? "🌙" : "🌞";
        localStorage.setItem("theme", isCurrentlyLightMode ? "light" : "dark");
    });
};

export const createCell = (tag, className, rowIndex, colIndex) => {
    const element = document.createElement(tag);
    element.className = className;
    element.dataset.row = rowIndex;
    element.dataset.col = colIndex;
    return element;
};
