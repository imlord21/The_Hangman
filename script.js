const inputElement = document.getElementById("letter-input");
const displayElement = document.getElementById("word-display");
const livesElement = document.getElementById("lives");
const guessedElement = document.getElementById("guessed-letters");
const messageElement = document.getElementById("message");
const restartButton = document.createElement("button");
restartButton.textContent = "🔁 Restart game";
restartButton.style.display = "block";
restartButton.style.margin = "20px auto";
restartButton.style.padding = "10px 20px";
restartButton.style.fontSize = "16px";
document.body.appendChild(restartButton);

function startGame() {
    const words = ["calculator", "cherry", "football", "phone", "programing", "javascript"];
    const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
    const guessedLetters = new Set();
    let lives = 7;
    let display = Array(word.length).fill("_");

    function updateDisplay() {
        displayElement.textContent = display.join(" ");
        livesElement.textContent = `Life Left: ${lives}`;
        guessedElement.textContent = `Guessed letters: ${[...guessedLetters].join(", ")}`;
    }

    function checkGameStatus() {
        if (!display.includes("_")) {
            messageElement.textContent = "🎉 \n" + "Congratulations! You guessed the word!!";
            inputElement.disabled = true;
        } else if (lives <= 0) {
            messageElement.textContent = `💀 You lost! The word was: "${word}"`;
            inputElement.disabled = true;
        }
    }

    function handleInput(e) {
        const letter = e.key.toLowerCase();
        if (!/^[a-zăîâșț]$/.test(letter) || guessedLetters.has(letter) || lives <= 0) {
            return;
        }
        guessedLetters.add(letter);
        if (word.includes(letter)) {
            word.split('').forEach((char, idx) => {
                if (char === letter) {
                    display[idx] = letter;
                }
            });
        } else {
            lives--;
        }
        updateDisplay();
        checkGameStatus();
    }

    inputElement.disabled = false;
    inputElement.value = "";
    inputElement.focus();
    messageElement.textContent = "";
    updateDisplay();
    inputElement.removeEventListener("keydown", inputElement._handler || (() => {}));
    inputElement._handler = handleInput;
    inputElement.addEventListener("keydown", inputElement._handler);
}

restartButton.onclick = startGame;
startGame();