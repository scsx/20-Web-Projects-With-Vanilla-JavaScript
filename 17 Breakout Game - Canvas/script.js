const rulesBtn = document.getElementById("rules-btn"),
    closeBtn = document.getElementById("close-btn"),
    rules = document.getElementById("rules"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    blue = "#0095dd",
    purple = "#9043a9",
    navyblue = "#000080";

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
    visible: true,
};

// Ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4, // self movement X (d = destination)
    dy: -4, // self movement Y
};

// Paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 30,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0, // self movement X - 0, we'll move it
};

// Create bricks
const bricks = [];

for (let i = 0; i < brickRows; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickCols; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = purple;
    ctx.fill();
    ctx.closePath();
}

// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = navyblue;
    ctx.fill();
    ctx.closePath();
}

// Draw score
function drawScore() {
    ctx.font = "17px Orbitron";
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks
function drawBricks() {
    bricks.forEach((column) => {
        column.forEach((brick) => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? blue : "transparent";
            ctx.fill();
            ctx.closePath();
        });
    });
}

// Move paddle
function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

// Move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (x)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1; // same as ball.dx = ball.dx * -1
    }

    // Wall collision (y)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // Paddle collision (y)
    if (
        ball.y - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach((column) => {
        column.forEach((brick) => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x && // left brick side check
                    ball.x + ball.size < brick.x + brick.w && // right brick side check
                    ball.y + ball.size > brick.y && // top brick side check
                    ball.y - ball.size < brick.y + brick.h // bottom brick side check
                ) {
                    ball.dy *= -1;
                    brick.visible = false;

                    increaseScore();
                }
            }
        });
    });

    // Hit bottom wall = loose
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}


// Score
function increaseScore() {
    score++;
    if (score % (brickRows * brickRows) === 0) {
        showAllBricks();
    }
}

// Make all bricks appear
function showAllBricks() {
    bricks.forEach(col => {
        col.forEach(brick => brick.visible = true)
    });
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
}

// Update canvas, draw and anims
function update() {
    movePaddle();
    moveBall();

    draw();

    requestAnimationFrame(update);
}

update();

// Key events
function keyDown(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        paddle.dx = paddle.speed;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft"
    ) {
        paddle.dx = 0;
    }
}

// Key evt listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Rules and close event handlers
rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
