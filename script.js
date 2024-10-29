let randomNumber;
let attempts = 0;
let timer;
let timeLeft = 30;
let highScore = localStorage.getItem('highScore') || 0;

const submitButton = document.getElementById('submit');
const guessInput = document.getElementById('guess');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart');
const difficultySelect = document.getElementById('difficulty');
const highScoreDisplay = document.getElementById('highscore');
const timeDisplay = document.getElementById('time');

function startGame() {
    attempts = 0;
    timeLeft = 30;
    resultDisplay.textContent = '';
    guessInput.value = '';
    randomNumber = generateRandomNumber();
    updateHighScore();
    startTimer();
}

function generateRandomNumber() {
    const difficulty = difficultySelect.value;
    let max;
    if (difficulty === 'easy') max = 50;
    else if (difficulty === 'medium') max = 100;
    else max = 200;

    return Math.floor(Math.random() * max) + 1;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            resultDisplay.textContent = `Waktu habis! Angka yang benar adalah ${randomNumber}.`;
            submitButton.style.display = 'none';
            restartButton.style.display = 'block';
        }
    }, 1000);
}

submitButton.addEventListener('click', () => {
    const userGuess = Number(guessInput.value);
    attempts++;

    if (userGuess === randomNumber) {
        clearInterval(timer);
        resultDisplay.textContent = `Selamat! Anda berhasil menebak angka ${randomNumber} dalam ${attempts} percobaan!`;
        if (attempts < highScore || highScore === 0) {
            highScore = attempts;
            localStorage.setItem('highScore', highScore);
            updateHighScore();
        }
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
    } else if (userGuess < randomNumber) {
        resultDisplay.textContent = 'Tebakan Anda terlalu rendah. Coba lagi!';
    } else if (userGuess > randomNumber) {
        resultDisplay.textContent = 'Tebakan Anda terlalu tinggi. Coba lagi!';
    }
});

restartButton.addEventListener('click', () => {
    submitButton.style.display = 'block';
    restartButton.style.display = 'none';
    startGame();
});

function updateHighScore() {
    highScoreDisplay.textContent = highScore;
}

// Memulai game saat pertama kali
startGame();
