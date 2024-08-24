export const ableToggleTheme = (toggleButton) => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        toggleButton.innerHTML = "🌙";
    } else {
        document.body.classList.remove("light-mode");
        toggleButton.innerHTML = "🌞";
    }

    toggleButton.addEventListener("click", () => {
        const isLightMode = document.body.classList.toggle("light-mode");
        toggleButton.innerHTML = isLightMode ? "🌙" : "🌞";
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
    });
};

export const createCell = (tag, className, rowIndex, colIndex) => {
    const element = document.createElement(tag);
    element.className = className;
    element.dataset.row = rowIndex;
    element.dataset.col = colIndex;
    return element;
};

export const formatTime = (time) => {
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
};
