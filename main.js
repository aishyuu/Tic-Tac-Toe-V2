const gameBoard = (function () {
    const board = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
    const display = () => {
        let text = ""
        for (let index = 0; index < board.length; index++) {
            const element = board[index];
            if((index + 1) % 3 != 0) {
                text += ` ${board[index]} |`
            } else if(index + 1 == board.length) {
                text += ` ${board[index]}`
            } else {
                text += ` ${board[index]}\n-----------\n`
            }
        }
        return text;
    }

    const mark = (index, player) => {
        if(board[index] != "0") {
            console.log("That position already has a marker");
        } else {
            board[index] = player.getMarker();
        }
    };

    return {display, mark};
})();

function createPlayer(marker) {
    let wins = 0;
    const getWins = () => wins;
    const increaseWins = () => wins++;
    const getMarker = () => marker;
    return {getWins, increaseWins, getMarker}
}

const playGame = (function () {
    const playerOne = createPlayer("X");
    const playerTwo = createPlayer("O");

    const playRound = (gameBoard) => {
        gameBoard.mark(4, playerOne);
        checkWinner(gameBoard, playerOne);
    }

    const checkWinner = (gameBoard, player) => {
        console.log(player.getMarker());
    };

    return {playRound}
})();

playGame.playRound(gameBoard)