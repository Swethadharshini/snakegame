const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = "RIGHT";
let gameOver = false;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
    };
}

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    ctx.fillStyle = "lime";
    snake.forEach((part, index) => {
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(part.x, part.y, boxSize, boxSize);
    });

    moveSnake();
    checkCollision();
}

function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= boxSize;
    else if (direction === "DOWN") head.y += boxSize;
    else if (direction === "LEFT") head.x -= boxSize;
    else if (direction === "RIGHT") head.x += boxSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    let head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
        alert("Game Over!");
        document.location.reload();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            alert("Game Over!");
            document.location.reload();
        }
    }
}

setInterval(draw, 100);