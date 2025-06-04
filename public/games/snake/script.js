const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, food, score, direction, interval;
let isGameOver = false;

const emojis = ["🍎", "🍇", "🍒", "🍓", "🥝", "🍊", "🍉"];

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
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
  interval = setInterval(draw, 120);
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  if ((key === "a" || key === "arrowleft") && direction !== "RIGHT") direction = "LEFT";
  if ((key === "w" || key === "arrowup") && direction !== "DOWN") direction = "UP";
  if ((key === "d" || key === "arrowright") && direction !== "LEFT") direction = "RIGHT";
  if ((key === "s" || key === "arrowdown") && direction !== "UP") direction = "DOWN";
});

// Touch controls (optional)
let touchStartX, touchStartY;
canvas.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
});
canvas.addEventListener("touchend", (e) => {
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && direction !== "LEFT") direction = "RIGHT";
    if (dx < 0 && direction !== "RIGHT") direction = "LEFT";
  } else {
    if (dy > 0 && direction !== "UP") direction = "DOWN";
    if (dy < 0 && direction !== "DOWN") direction = "UP";
  }
});
