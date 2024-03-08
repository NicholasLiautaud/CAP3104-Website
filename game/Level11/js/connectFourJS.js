const container = document.querySelector('.container');
const playerTurnText = document.getElementById('playerTurn');
const message = document.getElementById('message');
let currentPlayer = 1;
let gameActive = true;

// Initialize an empty board
let board = Array(6).fill().map(() => Array(7).fill(0));

// Function to create the game board
function createBoard() {
    container.innerHTML = ''; // Clear the container
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('grid-box');
            colDiv.dataset.column = col;
            colDiv.addEventListener('click', handleGamePlay);
            container.appendChild(colDiv);
        }
    }
}

// Function to handle the gameplay
function handleGamePlay(e) {
    if (!gameActive) return;

    const col = e.target.dataset.column;
    const row = getNextAvailableRow(col);
    
    if (row === -1) return; // Column is full

    board[row][col] = currentPlayer;
    updateBoard();

    if (checkWinner(row, col)) {
        gameActive = false;
        message.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        message.textContent = `It's a draw!`;
        return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurnText.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Function to get the next available row
function getNextAvailableRow(col) {
    for (let row = 5; row >= 0; row--) {
        if (board[row][col] === 0) {
            return row;
        }
    }
    return -1; // Column is full
}

// Function to update the board visually
function updateBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = container.children[row * 7 + col];
            cell.classList.remove('filled', 'player1', 'player2'); // Remove all
            if (board[row][col] === 1) {
                const disc = document.createElement('div');
                disc.classList.add('filled', 'player1');
                cell.appendChild(disc); // Add the disc as a child
            } else if (board[row][col] === 2) {
                const disc = document.createElement('div');
                disc.classList.add('filled', 'player2');
                cell.appendChild(disc); // Add the disc as a child
            }
        }
    }
}

// Function to check for a winner
function checkWinner(row, col) {
    const player = board[row][col];
    let count = 0;

    // Check horizontal
    for (let j = 0; j < 7; j++) {
        count = (board[row][j] === player) ? count+1 : 0;
        if (count >= 4) return true;
    }
    
    // Check vertical
    count = 0;
    for (let i = 0; i < 6; i++) {
        count = (board[i][col] === player) ? count+1 : 0;
        if (count >= 4) return true;
    }

    // Check diagonal (bottom left to top right)
    count = 0;
    let shift = Math.min(col, row);
    for (let i = row - shift, j = col - shift; i < 6 && j < 7; i++, j++) {
        count = (board[i][j] === player) ? count+1 : 0;
        if (count >= 4) return true;
    }

    // Check diagonal (top left to bottom right)
    count = 0;
    shift = Math.min(6 - col - 1, row);
    for (let i = row - shift, j = col + shift; i < 6 && j >= 0; i++, j--) {
        count = (board[i][j] === player) ? count+1 : 0;
        if (count >= 4) return true;
    }

    return false;
}

// Function to check for a draw
function checkDraw() {
    return board.every(row => row.every(cell => cell !== 0));
}

// Start the game
createBoard();
playerTurnText.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
