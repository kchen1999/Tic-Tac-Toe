//module
const gameBoard = (() => {
    const board = new Array(9);
    const getBoard = () => board; 
    return {
        getBoard
    };
})();

//module
const displayController = (() => {
    const player1 = Player('X'); 
    const player2 = Player('O'); 
})();


//factory
const Player = (sign) => {
    const getSign = () => sign; 
    return {
        getSign
    }; 
};  

