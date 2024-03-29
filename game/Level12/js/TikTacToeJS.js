document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('ticTacToeBoard');
  const restartButton = document.getElementById('restartButton');
  const cells = document.querySelectorAll('[data-cell]');
  let turn = 'X';

  function handleClick(event) {
    const cell = event.target;
    cell.textContent = turn;
    cell.style.pointerEvents = 'none';
    if (checkWin(turn)) {
      alert(`${turn} wins!`);
      restartGame();
    } else if (isDraw()) {
      alert("It's a draw!");
      restartGame();
    } else {
      turn = turn === 'X' ? 'O' : 'X';
    }
  }

  function checkWin(player) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some(combination => {
      return combination.every(index => {
        return cells[index].textContent === player;
      });
    });
  }

  function isDraw() {
    return [...cells].every(cell => cell.textContent);
  }

  function restartGame() {
    cells.forEach(cell => {
      cell.textContent = '';
      cell.style.pointerEvents = 'auto';
    });
    turn = 'X';
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));
  restartButton.addEventListener('click', restartGame);
});
