// Array representing the game board
let board = ["", "", "", "", "", "", "", "", ""];

// Array to keep track of the player's turn
let currentPlayer = "X";

// Boolean to check if the game is over
let gameOver = false;

// Get all the cells on the board
const cells = Array.from(document.querySelectorAll('.cell'));
// console.log("cells", cells)

// Add event listener to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

// Function to handle cell click
function handleClick(evt) {
  const cell = evt.target;
  // console.log('cell', cell)
  const cellIndex = cells.indexOf(cell);
  // console.log('cellIndex', cellIndex)

  // Check if the cell is already occupied or if the game is over
  if (board[cellIndex] !== "" || gameOver === true) {
    return;
  }

  // Set the current player's symbol on the board and update the UI
  board[cellIndex] = currentPlayer;
  // console.log('board[cellIndex]', board[cellIndex])
  cell.innerText = currentPlayer;
  // console.log('cell.innerText', cell.innerText)
  cell.classList.add(currentPlayer);
  // console.log('cell.classList', cell.classList)

  // Check if the current player has won
  if (checkWin(currentPlayer)) {
    gameOver = true;
    alert(`${currentPlayer} wins!`);
    return;
  }

  // Check if the game ended in a draw
  if (checkDraw()) {
    gameOver = true;
    alert("It's a draw!");
    return;
  }

  // Switch the current player
  // currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else {
    currentPlayer = 'X'
  }
}

// Function to check if the current player has won
function checkWin(player) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winConditions.some(combination => {
    return combination.every(index => {
      return board[index] === player;
    });
  });
}

// Function to check if the game ended in a draw
function checkDraw() {
  return board.every(cell => cell !== "");
}
