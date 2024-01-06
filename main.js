function createPlayer(marker) {
    const getMarker = () => marker;
    let wins = 0;
    const wonGame = () => wins++;
    const getWins = () => wins;
    return { getMarker, getWins, wonGame }
}

const game = (function () {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let whoIsPlaying = 1;
    const playerOne = createPlayer("X");
    const playerTwo = createPlayer("O");

    // Creates the board
    const createBoard = () => {
        const contentDiv = document.querySelector(".game-content");
        
        for (let index = 0; index < 9; index++) {
            const gameBox = document.createElement("div");
            gameBox.addEventListener('click', () => {
                let player
                if(whoIsPlaying === 1) {
                    player = playerOne
                } else {
                    player = playerTwo
                }
                markBoard(gameBox, player);
                board[index] = player.getMarker();
                whoIsPlaying = (whoIsPlaying == 1 ? 2 : 1);
                console.log(checkWin(board, player))
            })
            gameBox.classList.add("game-box");
            contentDiv.appendChild(gameBox);
        }
        createReset();
    }

    // Creates Reset Button
    const createReset = () => {
        const resetDiv = document.querySelector('.reset-content');

        const resetButton = document.createElement("button");
        resetButton.innerText = "Reset"
        resetButton.classList.add("reset-button");
        resetButton.addEventListener('click', () => {
            const allBoxes = document.querySelectorAll(".game-box");
            for (let index = 0; index < allBoxes.length; index++) {
                allBoxes[index].innerHTML = ``
                board[index] = 0
            }
        })

        resetDiv.appendChild(resetButton);
    }

    const checkWin = (board, player) => {
        const winConditions = ['036', '147', '258', '012', '345', '678', '048', '246'];
        const marker= player.getMarker();
        for (let index = 0; index < winConditions.length; index++) {
            const condition = winConditions[index];
            if(board[Number(condition[0])] == marker && board[Number(condition[1])] == marker && board[Number(condition[2])] == marker) {
                return true
            }
        }
        return false
    }

    const checkDraw = () => {

    }

    const markBoard = (square, player) => {
        square.innerHTML = `<h1>${player.getMarker()}</h1>`
    }

    const playGame = () => {
        createBoard();
    }


    return {playGame}
})()

game.playGame();