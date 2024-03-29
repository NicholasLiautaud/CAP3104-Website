let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
// You can add more characters or use images, etc.
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function createCard(cardContent) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('col-3', 'memory-card');
    cardElement.textContent = cardContent;
    cardElement.addEventListener('click', flipCard);
    document.getElementById('memoryGame').appendChild(cardElement);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.style.backgroundColor = '#6c757d'; // Flip the card

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.textContent === secondCard.textContent) {
        disableCards();
        matches++;
        if (matches === cards.length / 2) {
            setTimeout(() => alert('Congratulations! You found all matches!'), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.style.backgroundColor = '#007bff';
        secondCard.style.backgroundColor = '#007bff';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Shuffle the cards and add them to the DOM
shuffle(cards);
cards.forEach(createCard);

// When the DOM is loaded, reveal all cards briefly
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.memory-card').forEach(card => {
        card.style.backgroundColor = '#6c757d';
    });
    setTimeout(() => {
        document.querySelectorAll('.memory-card').forEach(card => {
            card.style.backgroundColor = '#007bff';
        });
    }, 2000);
});
