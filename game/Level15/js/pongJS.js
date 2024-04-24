const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 15;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballXSpeed = 4;
let ballYSpeed = 4;
let scoreLeft = 0;
let scoreRight = 0;

function drawPaddle(x, y) {
    context.fillStyle = '#fff';
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    context.fillStyle = '#fff';
    context.fillRect(ballX, ballY, ballSize, ballSize);
}

function updateScore() {
    document.getElementById('scoreLeft').textContent = scoreLeft;
    document.getElementById('scoreRight').textContent = scoreRight;
}

function randomizeDirection() {
    let directions = [-1, 1];
    return directions[Math.floor(Math.random() * directions.length)];
}

function resetBall() {
    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;
    let direction = randomizeDirection();
    ballXSpeed = 5 * direction;
    ballYSpeed = 5 * (Math.random() > 0.5 ? 1 : -1);  // Randomize the vertical direction as well
}

function moveBall() {
    ballX += ballXSpeed;
    ballY += ballYSpeed;

    if (ballY + ballSize > canvas.height || ballY < 0) {
        ballYSpeed = -ballYSpeed;
    }

    if (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballXSpeed = -ballXSpeed;
    } else if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballXSpeed = -ballXSpeed;
    }

    if (ballX < 0) {
        scoreRight++;
        updateScore();
        resetBall();
    } else if (ballX > canvas.width) {
        scoreLeft++;
        updateScore();
        resetBall();
    }
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);
    drawBall();
    moveBall();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': if (rightPaddleY > 0) rightPaddleY -= 20; break;
        case 'ArrowDown': if (rightPaddleY < canvas.height - paddleHeight) rightPaddleY += 20; break;
        case 'w': if (leftPaddleY > 0) leftPaddleY -= 20; break;
        case 's': if (leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 20; break;
    }
});

updateScore(); // Initialize score display
resetBall(); // Serve the ball initially with random direction
gameLoop(); // Start the game loop
