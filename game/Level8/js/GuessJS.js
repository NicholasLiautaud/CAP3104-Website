<script>
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guessCount = 0;

    function checkGuess() {
        const guessInput = document.getElementById('guess');
        const guess = parseInt(guessInput.value);
        const feedback = document.getElementById('feedback');
        const attempts = document.getElementById('attempts');

        if (isNaN(guess) || guess < 1 || guess > 100) {
            feedback.textContent = 'Please enter a number between 1 and 100.';
            return; // Stops further execution if the input is not valid
        }

        guessCount++;

        if (guess < randomNumber) {
            feedback.textContent = 'Too low! Try again.';
            feedback.style.color = 'red';
        } else if (guess > randomNumber) {
            feedback.textContent = 'Too high! Try again.';
            feedback.style.color = 'red';
        } else {
            feedback.textContent = 'Correct! Well done! The number was ' + randomNumber + '.';
            feedback.style.color = 'green';
            guessInput.disabled = true; // Disable input after correct guess
            document.getElementById('guess').style.borderColor = 'green';
        }
        attempts.textContent = 'Attempts: ' + guessCount;
    }
</script>
