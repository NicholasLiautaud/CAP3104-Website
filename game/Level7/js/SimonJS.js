document.addEventListener("DOMContentLoaded", function() {
    const buttons = {
        red: document.getElementById('red'),
        green: document.getElementById('green'),
        blue: document.getElementById('blue'),
        yellow: document.getElementById('yellow')
    };
    let sequence = [];
    let userSequence = [];
    let inGame = false;

    document.getElementById('startButton').addEventListener('click', startGame);

    function startGame() {
        sequence = [];
        userSequence = [];
        inGame = true;
        nextRound();
    }

    function nextRound() {
        userSequence = [];
        sequence.push(Object.keys(buttons)[Math.floor(Math.random() * 4)]);
        sequence.forEach((color, index) => {
            setTimeout(() => {
                activateButton(color);
            }, 1000 * index);
        });
    }

    function activateButton(color) {
        const button = buttons[color];
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 500);
    }

    Object.values(buttons).forEach(button => {
        button.addEventListener('click', (e) => {
            if (!inGame) return;
            const color = e.target.id;
            userSequence.push(color);
            activateButton(color);
            checkUserSequence();
        });
    });

    function checkUserSequence() {
        if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
            alert('Game over! Wrong sequence.');
            inGame = false;
            return;
        }
        if (userSequence.length === sequence.length) {
            setTimeout(nextRound, 1000);
        }
    }
});
