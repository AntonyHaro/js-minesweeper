import { ableToggleTheme } from "./utils.js";

function handleSubmit(event) {
    event.preventDefault();

    const gameDifficulty = document.querySelector(
        "input[name='game-difficulty']:checked"
    ).value;

    localStorage.setItem("gameDifficulty", gameDifficulty);
    window.location.href = "../game.html";
}

document
    .getElementById("difficulty-form")
    .addEventListener("submit", handleSubmit);

const toggleButton = document.getElementById("theme-toggle");
ableToggleTheme(toggleButton);
