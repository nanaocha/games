let currentPlayer = "X";
let cells = document.querySelectorAll(".cell");
let board = ["", "", "", "", "", "", "", "", ""];
let playerXScore = 0;
let playerOScore = 0;
let playerXName = "Player 1";
let playerOName = "Player 2";
let letsPlayButton = document.getElementById("letsPlayButton");
let playerNameInputs = document.querySelectorAll(".player-name-input");
let namesContainer = document.getElementById("namesContainer");
let playerONameContainer = document.getElementById("playerONameContainer");
let boardContainer = document.getElementById("board");
let scoresContainer = document.getElementById("scores");

function startGame() {
  playerXName = document.getElementById("playerXName").value || "Player 1";
  playerOName = document.getElementById("playerOName").value || "Player 2";

  document.getElementById("playerXNameDisplay").textContent = playerXName;
  document.getElementById("playerONameDisplay").textContent = playerOName;

  // Hide player name inputs, Let's Play button, and Player 2 name container
  namesContainer.style.display = "none";
  playerONameContainer.style.display = "none";
  letsPlayButton.style.display = "none";

  boardContainer.style.display = "grid";
  scoresContainer.style.display = "block";

  // Attach click handlers to cells
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(index));
  });
}

function makeMove(cellIndex) {
  if (board[cellIndex] === "" && currentPlayer !== "") {
    board[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    // Check for win or tie
    if (checkWin()) {
      if (currentPlayer === "X") {
        playerXScore++;
        document.getElementById("playerXScore").textContent = playerXScore;
        setTimeout(() => {
          showWinMessage(playerXName);
          resetBoard();
        }, 500);
      } else {
        playerOScore++;
        document.getElementById("playerOScore").textContent = playerOScore;
        setTimeout(() => {
          showWinMessage(playerOName);
          resetBoard();
        }, 500);
      }
    } else if (checkTie()) {
      setTimeout(() => {
        showTieMessage();
        resetBoard();
      }, 500);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}


function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].style.backgroundColor = "#90ee90"; // Highlight the winning cells
      cells[b].style.backgroundColor = "#90ee90";
      cells[c].style.backgroundColor = "#90ee90";
      return true;
    }
  }

  return false;
}

function checkTie() {
  return board.every(cell => cell !== "");
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "#f9f9f9";
  });
}

// ... Existing code ...

// Function to show the result modal with a custom message
function showResultModal(message) {
  const resultModal = document.getElementById("resultModal");
  const resultText = document.getElementById("resultText");
  
  resultText.textContent = message;
  resultModal.style.display = "flex";
}

// Function to reset the board and hide the modal
document.getElementById("playAgainButton").addEventListener("click", () => {
  document.getElementById("resultModal").style.display = "none";
  resetBoard();
});

// Function to show the win message in the modal
function showWinMessage(playerName) {
  const message = `${playerName} wins!`;
  showResultModal(message);
}

// Function to show the tie message in the modal
function showTieMessage() {
  const message = "It's a tie!";
  showResultModal(message);
}
