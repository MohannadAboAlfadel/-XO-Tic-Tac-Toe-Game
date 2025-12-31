// Screen Elements
const mainMenu = document.getElementById('main-menu');
const modeSelection = document.getElementById('mode-selection');
const gameScreen = document.getElementById('game-screen');
const exitScreen = document.getElementById('exit-screen');

// Game Elements
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const backBtn = document.getElementById('back-btn');
const cells = document.querySelectorAll('.cell');
const menuBtns = document.querySelectorAll('.menu-btn'); // This selects all buttons with .menu-btn class

// Specific Menu Buttons
const mainStartBtn = document.getElementById('main-start-btn');
const mainExitBtn = document.getElementById('main-exit-btn');
const modeBackBtn = document.getElementById('mode-back-btn');
const exitReloadBtn = document.getElementById('exit-reload-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let gameMode = 'pvp'; // 'pvp' or 'pvc'

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    // In PvC mode, prevent player from clicking during computer's turn
    if (gameMode === 'pvc' && currentPlayer === 'O') {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handleResultValidation() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningLine = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusElement.innerText = `Winner: ${currentPlayer}`;
        isGameActive = false;
        highlightWinningCells(winningLine);
        return;
    }

    const roundDraw = !board.includes('');
    if (roundDraw) {
        statusElement.innerText = 'Draw!';
        isGameActive = false;
        return;
    }

    handlePlayerChange();
}

function highlightWinningCells(winningLine) {
    winningLine.forEach(index => {
        cells[index].classList.add('win-cell');
    });
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerText = `Turn: ${currentPlayer}`;
    boardElement.setAttribute('data-turn', currentPlayer);

    if (gameMode === 'pvc' && currentPlayer === 'O' && isGameActive) {
        setTimeout(makeComputerMove, 500); // Add a small delay for realism
    }
}

function makeComputerMove() {
    if (!isGameActive) return;

    const availableIndices = board
        .map((val, index) => val === '' ? index : null)
        .filter(val => val !== null);

    if (availableIndices.length === 0) return;

    // Minimax AI
    let bestScore = -Infinity;
    let bestMove;
    
    // If it's the first move, play random (optimization)
    if (availableIndices.length === 9 || availableIndices.length === 8) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        bestMove = availableIndices[randomIndex];
    } else {
        for (let i = 0; i < availableIndices.length; i++) {
            let index = availableIndices[i];
            board[index] = 'O';
            let score = minimax(0, false);
            board[index] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = index;
            }
        }
    }

    const computerCell = cells[bestMove];
    handleCellPlayed(computerCell, bestMove);
    handleResultValidation();
}

function minimax(depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        
        if (a === '' || b === '' || c === '') continue;
        
        if (a === b && b === c) {
            if (a === 'O') return 10;
            else if (a === 'X') return -10;
        }
    }
    
    if (!board.includes('')) {
        return 0;
    }
    
    return null;
}

function handleRestartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusElement.innerText = `Turn: X`;
    boardElement.setAttribute('data-turn', 'X');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o', 'win-cell');
    });
}

function startGame(selectedMode) {
    gameMode = selectedMode;
    modeSelection.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    handleRestartGame();
}

function showModeSelection() {
    mainMenu.classList.add('hidden');
    modeSelection.classList.remove('hidden');
}

function showMainMenu() {
    gameScreen.classList.add('hidden');
    modeSelection.classList.add('hidden');
    exitScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}

function handleExit() {
    mainMenu.classList.add('hidden');
    exitScreen.classList.remove('hidden');
}

function returnToModeSelection() {
    gameScreen.classList.add('hidden');
    modeSelection.classList.remove('hidden');
    handleRestartGame(); // Optional: reset board when leaving
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', handleRestartGame);
backBtn.addEventListener('click', showModeSelection); // Back from Game -> Mode Selection

// Main Menu Listeners
mainStartBtn.addEventListener('click', showModeSelection);
mainExitBtn.addEventListener('click', handleExit);

// Mode Selection Listeners
modeBackBtn.addEventListener('click', showMainMenu); // Back from Mode -> Main Menu
exitReloadBtn.addEventListener('click', showMainMenu); // Play Again -> Main Menu

// Mode Buttons (PvP, PvC)
menuBtns.forEach(btn => {
    // We only want to attach this to actual mode buttons, not the other nav buttons
    if (btn.hasAttribute('data-mode')) {
        btn.addEventListener('click', (e) => {
            const mode = e.target.getAttribute('data-mode');
            startGame(mode);
        });
    }
});
