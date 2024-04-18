document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const scoreBoard = document.getElementById('scoreBoard');
    let score = 0;
    let balloons = 0;
    let gameSpeed = 6000; // Balloons will take 6 seconds to reach the top at the start

    function startGame() {
        gameArea.innerHTML = ''; // Clear previous balloons
        balloons = 0;
        score = 0;
        scoreBoard.textContent = 'Score: 0';
        createBalloon();
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 60))}px`;
        gameArea.appendChild(balloon);
        animateBalloon(balloon);
        balloons++;
        if (balloons < 20) { // Control number of balloons created
            setTimeout(createBalloon, 1000);
        }
    }

    function animateBalloon(balloon) {
        let balloonPosition = 0;
        const animation = setInterval(() => {
            if (balloonPosition >= (gameArea.offsetHeight - 70)) {
                clearInterval(animation);
                gameArea.removeChild(balloon);
            } else {
                balloonPosition += 2; // Speed of balloon ascent
                balloon.style.bottom = `${balloonPosition}px`;
            }
        }, gameSpeed / 600);
        balloon.onclick = () => {
            score++;
            scoreBoard.textContent = `Score: ${score}`;
            gameArea.removeChild(balloon);
            clearInterval(animation);
        };
    }
});
