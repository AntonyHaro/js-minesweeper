export const ableToggleTheme = (toggleButton) => {
    // Obtém o tema salvo e aplica o modo apropriado
    const savedTheme = localStorage.getItem("theme") || "dark";
    const isLightMode = savedTheme === "light";

    document.body.classList.toggle("light-mode", isLightMode);
    toggleButton.textContent = isLightMode ? "🌙" : "🌞";

    // Adiciona o evento de clique para alternar o tema
    toggleButton.addEventListener("click", () => {
        const isCurrentlyLightMode =
            document.body.classList.toggle("light-mode");
        toggleButton.textContent = isCurrentlyLightMode ? "🌙" : "🌞";
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
