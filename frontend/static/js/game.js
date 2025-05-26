document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const restartBtn = document.getElementById("restart");
    
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWinner() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                status.textContent = `Player ${gameState[a]} Wins!`;
                playSound("static/media/win-sound.mp3");
                return;
            }
        }
        if (!gameState.includes("")) {
            gameActive = false;
            status.textContent = "It's a Draw!";
        }
    }

    function handleMove(index) {
        if (!gameState[index] && gameActive) {
            gameState[index] = currentPlayer;
            board[index].textContent = currentPlayer;
            board[index].classList.add(currentPlayer);
            playSound("static/media/click-sound.mp3");
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (gameActive) status.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function restartGame() {
        gameState.fill("");
        board.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });
        gameActive = true;
        currentPlayer = "X";
        status.textContent = "Player X's Turn";
    }

    function playSound(file) {
        let sound = new Audio(file);
        sound.play();
    }

    board.forEach((cell, index) => {
        cell.addEventListener("click", () => handleMove(index));
    });

    restartBtn.addEventListener("click", restartGame);
});
