export const toggleTheme = (toggleButton) => {
    toggleButton.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            toggleButton.innerHTML = "🌞";
            return;
        }
        document.body.classList.add("dark-mode");
        toggleButton.innerHTML = "🌙";
    });
};
