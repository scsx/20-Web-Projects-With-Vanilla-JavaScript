const rulesBtn = document.getElementById("rules-btn"),
    closeBtn = document.getElementById("close-btn"),
    rules = document.getElementById("rules"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    blue = "#0095dd";

let score = 0;

const brickRows = 9;
const brickCols = 5;

// Brick
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4, // movement X
    dy: -4, // movement Y
};

// Paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0, // movement X
};

// Create bricks
const bricks = [];

for (let i = 0; i < brickRows; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickCols; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo}
    }
}

console.log(bricks);

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = blue;
    ctx.fill();
    ctx.closePath();
}

// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = blue;
    ctx.fill();
    ctx.closePath();
}

// Draw score
function drawScore() {
    ctx.font = '17px Orbitron';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? blue : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

// Draw everything
function draw() {
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
}

draw();

// Rules and close event handlers
rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
