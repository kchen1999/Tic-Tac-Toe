//module
const gameBoard = (() => {
    const board = new Array(9);
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
    let playerTurn = 1; 
    const board = document.querySelector('.game-board');
    const checkLegalMove = (index) => {
        if(gameBoard.getBoard()[index] == null) {
            console.log("legal move");
            return true; 
        }
        console.log("illegal move");
        return false; 
    };
    const startGame = () => {
        board.addEventListener('click', e => {
            const clickedIndex = [...e.target.parentNode.children].indexOf(e.target); 
            if(playerTurn == 1 && checkLegalMove(clickedIndex)) {
                gameBoard.updateBoard(clickedIndex, 'X');
                e.target.textContent = 'X'; 
                playerTurn = 0; 
            }
            else if(playerTurn == 0 && checkLegalMove(clickedIndex)) {
                gameBoard.updateBoard(clickedIndex, 'O');
                e.target.textContent = '0'; 
                playerTurn = 1; 
            }
        });
    };
    return {
        startGame
    };
})();

displayController.startGame(gameBoard);


