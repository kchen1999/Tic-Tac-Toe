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

    const startGame = () => {
        board.addEventListener('click', e => {
            const clickedIndex = [...e.target.parentNode.children].indexOf(e.target); 
            if(playerTurn == 'X' && checkLegalMove(clickedIndex)) {
                gameBoard.updateBoard(clickedIndex, 'X');
                e.target.textContent = 'X'; 
                if(isGameOver(clickedIndex) || isDraw()) {
                    console.log("Game Over");
                }
                playerTurn = '0'; 
            }
            else if(playerTurn == '0' && checkLegalMove(clickedIndex)) {
                gameBoard.updateBoard(clickedIndex, '0');
                e.target.textContent = '0'; 
                if(isGameOver(clickedIndex) || isDraw()) {
                    console.log("Game Over");
                }
                playerTurn = 'X'; 
            }
        });
    };
    return {
        startGame
    };
})();

displayController.startGame(gameBoard);


