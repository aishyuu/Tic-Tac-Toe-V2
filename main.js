class Player {
    #mark
    constructor(marker) {
        this.#mark = marker
    }

    getMarker() {
        return this.#mark
    }
}

const game = (function () {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let whoIsPlaying = 1;
    const playerOne = new Player("X");
    const playerTwo = new Player("O");
    const gameConditionText = document.querySelector('.game-condition > h1');

    // Creates the board
    const createBoard = () => {
        const contentDiv = document.querySelector(".game-content");
        gameConditionText.innerText = "X's turn"
        for (let index = 0; index < 9; index++) {
            const gameBox = document.createElement("div");
            gameBox.addEventListener('click', () => {
                if(board[index] === 0) {
                    let player
                    if(whoIsPlaying === 1) {
                        player = playerOne
                    } else {
                        player = playerTwo
                    }
                    markBoard(gameBox, player);
                    board[index] = player.getMarker();
                    whoIsPlaying = (whoIsPlaying == 1 ? 2 : 1);
                    gameConditionText.innerText = (whoIsPlaying == 1 ? "X's turn" : "O's turn")
                    if(!checkWin(board, player)) {
                        if(checkDraw(board)) {
                            contentDiv.classList.add('game-concluded')
                            gameConditionText.innerText = "Draw!"
                        }
                    } else {
                        gameConditionText.innerText = `${player.getMarker()} wins!`
                        contentDiv.classList.add('game-concluded')
                    }
                }
            })
            gameBox.classList.add("game-box");
            contentDiv.appendChild(gameBox);
        }
        createReset(contentDiv);
    }

    // Creates Reset Button
    const createReset = (contentDiv) => {
        const resetDiv = document.querySelector('.reset-content');

        const resetButton = document.createElement("button");
        resetButton.innerText = "Reset"
        resetButton.classList.add("reset-button");
        resetButton.addEventListener('click', () => {
            const allBoxes = document.querySelectorAll(".game-box");
            for (let index = 0; index < allBoxes.length; index++) {
                allBoxes[index].innerHTML = ``;
                board[index] = 0;
            }
            whoIsPlaying = 1;
            gameConditionText.innerText = "X's turn";
            contentDiv.classList.remove('game-concluded')
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

    const checkDraw = (board) => {
        if(board.includes(0)) {
            return false;
        } else {
            return true
        }
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