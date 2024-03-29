let timeLeft = 10;
let clickCount = 0;
let timerId;

document.getElementById('clickArea').addEventListener('click', () => {
    clickCount++;
    document.getElementById('clickCount').textContent = clickCount;
});

function startGame() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerId);
    document.getElementById('clickArea').style.pointerEvents = 'none';
    alert(`Game over! You clicked ${clickCount} times.`);
}

// Start the game when the document is loaded
document.addEventListener('DOMContentLoaded', startGame);
