const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, food, score, direction, nextDirection, interval;
let isGameOver = false;

const emojis = ["🍎", "🍇", "🍒", "🍓", "🥝", "🍊", "🍉"];

document.getElementById("startBtn").addEventListener("click", startGame);

function getSpeedForScore(score) {
  if (score < 5) return { delay: 250, multiplier: "0.25x" };
  if (score < 10) return { delay: 200, multiplier: "0.5x" };
  if (score < 15) return { delay: 150, multiplier: "0.75x" };
  if (score < 20) return { delay: 120, multiplier: "1.0x" };
  if (score < 25) return { delay: 90, multiplier: "1.5x" };
  if (score < 30) return { delay: 60, multiplier: "2.0x" };
  return { delay: 40, multiplier: "3.0x" };
}

function startGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  nextDirection = "RIGHT";
  score = 0;
  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
    emoji: emojis[Math.floor(Math.random() * emojis.length)]
  };
  document.getElementById("score").textContent = score;
  document.getElementById("gameOverOverlay").classList.add("hidden");
  isGameOver = false;
  clearInterval(interval);
  const speedInfo = getSpeedForScore(score);
  interval = setInterval(draw, speedInfo.delay);
  document.getElementById("speed").textContent = speedInfo.multiplier;
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  direction = nextDirection;

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00f" : "#0f0";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.font = "20px Arial";
  ctx.fillText(food.emoji, food.x + 2, food.y + 18);

  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    collision(head, snake)
  ) {
    clearInterval(interval);
    document.getElementById("gameOverOverlay").classList.remove("hidden");
    document.getElementById("finalScore").textContent = score;
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    };
    clearInterval(interval);
    const speedInfo = getSpeedForScore(score);
    interval = setInterval(draw, speedInfo.delay);
    document.getElementById("speed").textContent = speedInfo.multiplier;
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function collision(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) return true;
  }
  return false;
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if ((key === "a" || key === "arrowleft") && direction !== "RIGHT") nextDirection = "LEFT";
  else if ((key === "w" || key === "arrowup") && direction !== "DOWN") nextDirection = "UP";
  else if ((key === "d" || key === "arrowright") && direction !== "LEFT") nextDirection = "RIGHT";
  else if ((key === "s" || key === "arrowdown") && direction !== "UP") nextDirection = "DOWN";
});

// Touch controls
let touchStartX, touchStartY;
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
});
canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && direction !== "LEFT") nextDirection = "RIGHT";
    else if (dx < 0 && direction !== "RIGHT") nextDirection = "LEFT";
  } else {
    if (dy > 0 && direction !== "UP") nextDirection = "DOWN";
    else if (dy < 0 && direction !== "DOWN") nextDirection = "UP";
  }
});
