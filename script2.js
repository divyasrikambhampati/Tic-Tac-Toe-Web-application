const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');

let isXTurn = true;
let boardState = Array(9).fill(null);

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', startGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    boardState[cellIndex(cell)] = currentClass;
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function cellIndex(cell) {
    return Array.from(cells).indexOf(cell);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentClass;
        });
    });
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}

function endGame(draw) {
    if (draw) {
        messageElement.textContent = 'Draw!';
    } else {
        messageElement.textContent = `${isXTurn ? 'X' : 'O'} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function startGame() {
    isXTurn = true;
    boardState = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageElement.textContent = '';
}

startGame();
