let timerInterval;
let timeLeft = 0;
let score = 0;
let currentAnswer = 0;

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const problemDisplay = document.getElementById("problem");
const answerInput = document.getElementById("answer");
const feedbackDisplay = document.getElementById("feedback");
const gameSection = document.getElementById("game");
const overlay = document.getElementById("gameOverOverlay");
const finalScore = document.getElementById("finalScore");
const startButton = document.getElementById("startButton");

function generateProblem() {
  const difficulty = document.getElementById("difficulty").value;
  let a, b, operator;

  if (difficulty === "easy") {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    operator = Math.random() < 0.5 ? "+" : "-";
  } else {
    const ops = ["+", "-", "*", "/"];
    operator = ops[Math.floor(Math.random() * ops.length)];
    a = Math.floor(Math.random() * 50) + 1;
    b = Math.floor(Math.random() * 50) + 1;
    if (operator === "/") {
      a = a * b; // ensure divisible
    }
  }

  currentAnswer = eval(`${a} ${operator} ${b}`);
  currentAnswer = Math.round(currentAnswer); // integer only
  problemDisplay.textContent = `${a} ${operator} ${b}`;
}

function startGame() {
  // reset
  timeLeft = parseInt(document.getElementById("duration").value);
  score = 0;
  scoreDisplay.textContent = score;
  feedbackDisplay.textContent = "";
  overlay.classList.remove("show");
  gameSection.style.display = "block";
  document.getElementById("settings").style.display = "none";

  generateProblem();
  timerDisplay.textContent = timeLeft;
  answerInput.value = "";
  answerInput.focus();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  finalScore.textContent = score;
  overlay.classList.add("show");
  gameSection.style.display = "none";
  document.getElementById("settings").style.display = "block";
}

answerInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  if (userAnswer === currentAnswer) {
    score++;
    feedbackDisplay.textContent = "Correct!";
    feedbackDisplay.className = "feedback correct";
  } else {
    feedbackDisplay.textContent = "Wrong!";
    feedbackDisplay.className = "feedback wrong";
  }
  scoreDisplay.textContent = score;
  answerInput.value = "";
  generateProblem();
}

// 🔄 Legăm butonul de start
startButton.addEventListener("click", startGame);
