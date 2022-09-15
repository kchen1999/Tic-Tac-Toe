//module
const gameBoard = (() => {
    const board = new Array(9).fill(null);
    const getBoard = () => board; 
    const updateBoard = (index, playerSign) => {
        board[index] = playerSign;
    };
    return {
        getBoard,
        updateBoard
    };
})();

//factory
const Player = (playerSign) => {
    const getPlayerSign = () => playerSign; 
    return {
        getPlayerSign
    }; 
};  

//module
const displayController = (() => {
    const player1 = Player('X'); 
    const player2 = Player('O');
    let playerTurn = 'X'; 
    const board = document.querySelector('.game-board');
    const resetBtn = document.querySelector('button'); 
    const checkLegalMove = (index) => {
        if(gameBoard.getBoard()[index] == null) {
            return true; 
        }
        return false; 
    };
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isGameOver = (clickedIndex) =>
        winningCombinations.filter(combination => combination.includes(clickedIndex)).some(
            (possibleCombination) => possibleCombination.every((index) =>
                gameBoard.getBoard()[index] === playerTurn
            )
        );
    ;

    const isDraw = () => 
        !gameBoard.getBoard().includes(null);
    ;

    const setPlayerField = () => {
        const playerField = document.querySelector('.header');
        playerField.textContent = `Player ${playerTurn}'s turn`;
    }

    const setWinningMessage = () => {
        const playerField = document.querySelector('.header');
        playerField.textContent = `Player ${playerTurn} has won!`;
    }

    const setDrawMessage = () => {
        const playerField = document.querySelector('.header');
        playerField.textContent = "Game is a draw!";
    }


    const startGame = () => {
        board.addEventListener('click', e => {
            const clickedIndex = [...e.target.parentNode.children].indexOf(e.target); 
            if(checkLegalMove(clickedIndex)) {
                gameBoard.updateBoard(clickedIndex, playerTurn);
                e.target.textContent = playerTurn; 
                if(isGameOver(clickedIndex)) {
                    setWinningMessage();
                }
                else if(isDraw()) {
                    setDrawMessage();
                }
                else if(playerTurn === 'X') {
                    playerTurn = '0';
                    setPlayerField(); 
                }
                else {
                    playerTurn = 'X'; 
                    setPlayerField(); 
                }
            }
        });
        resetBtn.addEventListener('click', () => {
            for(let i = 0; i < 9; i++) {
                gameBoard.updateBoard(i, null); 
            }
            playerTurn = 'X'; 
            [...board.children].forEach((gameSquare) => gameSquare.textContent = '');
        }  
        );
    };
    return {
        startGame
    };
})();

displayController.startGame(gameBoard);


