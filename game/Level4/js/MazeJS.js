const canvas = document.getElementById('snakeCanvas');
canvas.width = 400; // Set the width of the canvas
canvas.height = 400; // Set the height of the canvas

const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let interval;
let speed = 150; // Increased initial speed

(function setup() {
    snake = new Snake();
    food = new Food();
    food.pickLocation();
    interval = setInterval(gameLoop, speed);
    document.getElementById('score').innerText = 'Score: 0'; // Initialize score display
}());

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    snake.update();
    snake.draw();

    if (snake.eat(food)) {
        food.pickLocation();
        increaseSpeed();
    }

    snake.checkCollision();
    if (snake.collision) gameOver();
}

function increaseSpeed() {
    if (speed > 80) { // Lower threshold to keep the game playable
        speed -= 5; // Slightly faster increase in speed
        clearInterval(interval);
        interval = setInterval(gameLoop, speed);
    }
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.collision = false;

    this.draw = function() {
        ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.x = this.x >= canvas.width ? 0 : this.x < 0 ? canvas.width - scale : this.x;
        this.y = this.y >= canvas.height ? 0 : this.y < 0 ? canvas.height - scale : this.y;
    };

    this.changeDirection = function(direction) {
        switch(direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    };

    this.checkCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.collision = true;
            }
        }
    };

    this.eat = function(food) {
        if (this.x === food.x && this.y === food.y) {
            this.total++;
            document.getElementById('score').innerText = 'Score: ' + this.total; // Update score display
            return true;
        }

        return false;
    };
}

function Food() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * (columns - 1)) + 1) * scale;
        this.y = (Math.floor(Math.random() * (rows - 1)) + 1) * scale;
    };

    this.draw = function() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

function gameOver() {
    alert('Game Over! Your score: ' + snake.total);
    document.getElementById('score').innerText = 'Score: 0'; // Reset score display
    snake = new Snake(); // Reset snake
    speed = 150; // Reset speed to original faster speed
    clearInterval(interval);
    interval = setInterval(gameLoop, speed);
}

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));
