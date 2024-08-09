
// // const rows = 10;
// // const cols = 10;
// // const minesCount = 20;
// // let grid = [];
// // let mineLocations = [];
// // let gameOver = false;
// // let startTime;
// // let timerInterval;

// // const gameContainer = document.getElementById('game-container');
// // const timeDisplay = document.getElementById('time');
// // const statusDisplay = document.getElementById('status');
// // const startBtn = document.getElementById('start-btn');
// // const restartBtn = document.getElementById('restart-btn');

// // function initGame() {
// //     grid = [];
// //     mineLocations = [];
// //     gameOver = false;
// //     gameContainer.innerHTML = '';
// //     statusDisplay.textContent = '';
// //     clearInterval(timerInterval);
// //     timeDisplay.textContent = 'Time: 0s';

// //     for (let i = 0; i < rows; i++) {
// //         grid[i] = [];
// //         for (let j = 0; j < cols; j++) {
// //             const cell = document.createElement('div');
// //             cell.classList.add('cell');
// //             cell.dataset.row = i;
// //             cell.dataset.col = j;
// //             cell.addEventListener('click', handleClick);
// //             grid[i][j] = cell;
// //             gameContainer.appendChild(cell);
// //         }
// //     }

// //     // Place mines
// //     for (let i = 0; i < minesCount; i++) {
// //         let row, col;
// //         do {
// //             row = Math.floor(Math.random() * rows);
// //             col = Math.floor(Math.random() * cols);
// //         } while (mineLocations.includes(`${row}-${col}`));

// //         mineLocations.push(`${row}-${col}`);
// //         grid[row][col].dataset.mine = 'true';
// //     }

// //     // Disable grid interaction until the game is started
// //     gameContainer.style.pointerEvents = 'none';
// //     restartBtn.style.display = 'none';
// //     startBtn.style.display = 'inline-block';
// // }

// // function startGame() {
// //     gameOver = false;
// //     startTime = new Date().getTime();
// //     timerInterval = setInterval(updateTime, 1000);
// //     gameContainer.style.pointerEvents = 'auto';
// //     startBtn.style.display = 'none';
// //     restartBtn.style.display = 'inline-block';
// // }

// // function handleClick(event) {
// //     const row = parseInt(event.target.dataset.row);
// //     const col = parseInt(event.target.dataset.col);

// //     if (gameOver || grid[row][col].classList.contains('revealed')) return;

// //     if (grid[row][col].dataset.mine === 'true') {
// //         revealMines();
// //         gameOver = true;
// //         clearInterval(timerInterval);
// //         statusDisplay.textContent = 'Game Over!';
// //         sendScore(0); // No score for losing
// //     } else {
// //         revealCell(row, col);
// //         checkWin();
// //     }
// // }

// // function revealCell(row, col) {
// //     if (row < 0 || row >= rows || col < 0 || col >= cols) return;
// //     if (grid[row][col].classList.contains('revealed')) return;

// //     grid[row][col].classList.add('revealed');

// //     const adjacentMines = countAdjacentMines(row, col);
// //     if (adjacentMines > 0) {
// //         grid[row][col].textContent = adjacentMines;
// //     } else {
// //         revealAdjacentCells(row, col);
// //     }
// // }

// // function revealAdjacentCells(row, col) {
// //     for (let i = -1; i <= 1; i++) {
// //         for (let j = -1; j <= 1; j++) {
// //             revealCell(row + i, col + j);
// //         }
// //     }
// // }

// // function countAdjacentMines(row, col) {
// //     let count = 0;
// //     for (let i = -1; i <= 1; i++) {
// //         for (let j = -1; j <= 1; j++) {
// //             const newRow = row + i;
// //             const newCol = col + j;
// //             if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
// //                 if (grid[newRow][newCol].dataset.mine === 'true') {
// //                     count++;
// //                 }
// //             }
// //         }
// //     }
// //     return count;
// // }

// // function revealMines() {
// //     for (const location of mineLocations) {
// //         const [row, col] = location.split('-').map(Number);
// //         grid[row][col].classList.add('mine');
// //         grid[row][col].textContent = '💣';
// //     }
// // }

// // function checkWin() {
// //     let safeCells = 0;
// //     for (let i = 0; i < rows; i++) {
// //         for (let j = 0; j < cols; j++) {
// //             if (!grid[i][j].classList.contains('revealed') && grid[i][j].dataset.mine !== 'true') {
// //                 return;
// //             }
// //             if (grid[i][j].classList.contains('revealed') && grid[i][j].dataset.mine !== 'true') {
// //                 safeCells++;
// //             }
// //         }
// //     }

// //     if (safeCells === rows * cols - minesCount) {
// //         clearInterval(timerInterval);
// //         gameOver = true;
// //         statusDisplay.textContent = 'You Win!';
// //         const timeTaken = Math.floor((new Date().getTime() - startTime) / 1000);
// //         const score = (rows * cols - minesCount) * 10 - timeTaken;
// //         sendScore(score);
// //     }
// // }

// // function updateTime() {
// //     const currentTime = Math.floor((new Date().getTime() - startTime) / 1000);
// //     timeDisplay.textContent = `Time: ${currentTime}s`;
// // }

// // function sendScore(score) {
// //     window.parent.postMessage({ type: 'submit-score', score }, '*');
// // }

// // startBtn.addEventListener('click', startGame);
// // restartBtn.addEventListener('click', initGame);

// // initGame();
// const rows = 10;
// const cols = 10;
// const minesCount = 20;
// let grid = [];
// let mineLocations = [];
// let gameOver = false;
// let startTime;
// let timerInterval;
// let safeCellsRevealed = 0;

// const gameContainer = document.getElementById('game-container');
// const timeDisplay = document.getElementById('time');
// const statusDisplay = document.getElementById('status');
// const startBtn = document.getElementById('start-btn');
// const restartBtn = document.getElementById('restart-btn');

// function initGame() {
//     grid = [];
//     mineLocations = [];
//     gameOver = false;
//     safeCellsRevealed = 0;
//     gameContainer.innerHTML = '';
//     statusDisplay.textContent = '';
//     clearInterval(timerInterval);
//     timeDisplay.textContent = 'Time: 0s';

//     for (let i = 0; i < rows; i++) {
//         grid[i] = [];
//         for (let j = 0; j < cols; j++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             cell.dataset.row = i;
//             cell.dataset.col = j;
//             cell.addEventListener('click', handleClick);
//             grid[i][j] = cell;
//             gameContainer.appendChild(cell);
//         }
//     }

//     // Place mines
//     for (let i = 0; i < minesCount; i++) {
//         let row, col;
//         do {
//             row = Math.floor(Math.random() * rows);
//             col = Math.floor(Math.random() * cols);
//         } while (mineLocations.includes(`${row}-${col}`));

//         mineLocations.push(`${row}-${col}`);
//         grid[row][col].dataset.mine = 'true';
//     }

//     // Disable grid interaction until the game is started
//     gameContainer.style.pointerEvents = 'none';
//     restartBtn.style.display = 'none';
//     startBtn.style.display = 'inline-block';
// }

// function startGame() {
//     gameOver = false;
//     startTime = new Date().getTime();
//     timerInterval = setInterval(updateTime, 1000);
//     gameContainer.style.pointerEvents = 'auto';
//     startBtn.style.display = 'none';
//     restartBtn.style.display = 'inline-block';
// }

// function handleClick(event) {
//     const row = parseInt(event.target.dataset.row);
//     const col = parseInt(event.target.dataset.col);

//     if (gameOver || grid[row][col].classList.contains('revealed')) return;

//     if (grid[row][col].dataset.mine === 'true') {
//         revealMines();
//         gameOver = true;
//         clearInterval(timerInterval);
//         statusDisplay.textContent = 'Game Over!';
//         sendScore(0); // No score for losing
//     } else {
//         revealCell(row, col);
//         checkWin();
//     }
// }

// function revealCell(row, col) {
//     if (row < 0 || row >= rows || col < 0 || col >= cols) return;
//     if (grid[row][col].classList.contains('revealed')) return;

//     grid[row][col].classList.add('revealed');
//     safeCellsRevealed++;

//     const adjacentMines = countAdjacentMines(row, col);
//     if (adjacentMines > 0) {
//         grid[row][col].textContent = adjacentMines;
//     } else {
//         revealAdjacentCells(row, col);
//     }
// }

// function revealAdjacentCells(row, col) {
//     for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++) {
//             revealCell(row + i, col + j);
//         }
//     }
// }

// function countAdjacentMines(row, col) {
//     let count = 0;
//     for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++) {
//             const newRow = row + i;
//             const newCol = col + j;
//             if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
//                 if (grid[newRow][newCol].dataset.mine === 'true') {
//                     count++;
//                 }
//             }
//         }
//     }
//     return count;
// }

// function revealMines() {
//     for (const location of mineLocations) {
//         const [row, col] = location.split('-').map(Number);
//         grid[row][col].classList.add('mine');
//         grid[row][col].textContent = '💣';
//     }
// }

// function checkWin() {
//     let safeCells = 0;
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             if (!grid[i][j].classList.contains('revealed') && grid[i][j].dataset.mine !== 'true') {
//                 return;
//             }
//             if (grid[i][j].classList.contains('revealed') && grid[i][j].dataset.mine !== 'true') {
//                 safeCells++;
//             }
//         }
//     }

//     if (safeCells === rows * cols - minesCount) {
//         clearInterval(timerInterval);
//         gameOver = true;
//         statusDisplay.textContent = 'You Win!';
//         const timeTaken = Math.floor((new Date().getTime() - startTime) / 1000);
//         const score = calculateScore(safeCellsRevealed, timeTaken);
//         sendScore(score);
//     }
// }

// function calculateScore(safeCellsRevealed, timeTaken) {
//     return safeCellsRevealed * 100 - timeTaken * 10;
// }

// function updateTime() {
//     const currentTime = Math.floor((new Date().getTime() - startTime) / 1000);
//     timeDisplay.textContent = `Time: ${currentTime}s`;
// }

// function sendScore(score) {
//     window.parent.postMessage({ type: 'submit-score', score }, '*');
// }

// startBtn.addEventListener('click', startGame);
// restartBtn.addEventListener('click', initGame);

// initGame();
const rows = 10;
const cols = 10;
const minesCount = 20;
let grid = [];
let mineLocations = [];
let gameOver = false;
let startTime;
let timerInterval;
let safeCellsRevealed = 0;

const gameContainer = document.getElementById('game-container');
const timeDisplay = document.getElementById('time');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

function initGame() {
    grid = [];
    mineLocations = [];
    gameOver = false;
    safeCellsRevealed = 0;
    gameContainer.innerHTML = '';
    statusDisplay.textContent = '';
    clearInterval(timerInterval);
    timeDisplay.textContent = 'Time: 0s';

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleClick);
            grid[i][j] = cell;
            gameContainer.appendChild(cell);
        }
    }

    // Place mines
    for (let i = 0; i < minesCount; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * cols);
        } while (mineLocations.includes(`${row}-${col}`));

        mineLocations.push(`${row}-${col}`);
        grid[row][col].dataset.mine = 'true';
    }

    // Disable grid interaction until the game is started
    gameContainer.style.pointerEvents = 'none';
    restartBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';
}

function startGame() {
    gameOver = false;
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 1000);
    gameContainer.style.pointerEvents = 'auto';
    startBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}

function handleClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (gameOver || grid[row][col].classList.contains('revealed')) return;

    if (grid[row][col].dataset.mine === 'true') {
        revealMines();
        gameOver = true;
        clearInterval(timerInterval);
        statusDisplay.textContent = 'Game Over!';
        const score = calculateScore(safeCellsRevealed, getElapsedTime());
        sendScore(score);  // Send the calculated score even when the game is lost
    } else {
        revealCell(row, col);
        checkWin();
    }
}

function revealCell(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (grid[row][col].classList.contains('revealed')) return;

    grid[row][col].classList.add('revealed');
    safeCellsRevealed++;

    const adjacentMines = countAdjacentMines(row, col);
    if (adjacentMines > 0) {
        grid[row][col].textContent = adjacentMines;
    } else {
        revealAdjacentCells(row, col);
    }
}

function revealAdjacentCells(row, col) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            revealCell(row + i, col + j);
        }
    }
}

function countAdjacentMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (grid[newRow][newCol].dataset.mine === 'true') {
                    count++;
                }
            }
        }
    }
    return count;
}

function revealMines() {
    for (const location of mineLocations) {
        const [row, col] = location.split('-').map(Number);
        grid[row][col].classList.add('mine');
        grid[row][col].textContent = '💣';
    }
}

function checkWin() {
    let safeCells = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!grid[i][j].classList.contains('revealed') && grid[i][j].dataset.mine !== 'true') {
                return;
            }
            if (grid[i][j].classList.contains('revealed') && grid[i][j].dataset.mine !== 'true') {
                safeCells++;
            }
        }
    }

    if (safeCells === rows * cols - minesCount) {
        clearInterval(timerInterval);
        gameOver = true;
        statusDisplay.textContent = 'You Win!';
        const score = calculateScore(safeCellsRevealed, getElapsedTime());
        sendScore(score);
    }
}

function calculateScore(safeCellsRevealed, timeTaken) {
    const baseScore = safeCellsRevealed * 100;
    const timePenalty = timeTaken * 10;
    return Math.max(0, baseScore - timePenalty);
}

function updateTime() {
    timeDisplay.textContent = `Time: ${getElapsedTime()}s`;
}

function getElapsedTime() {
    return Math.floor((new Date().getTime() - startTime) / 1000);
}

function sendScore(score) {
    window.parent.postMessage({ type: 'submit-score', score }, '*');
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', initGame);

initGame();
