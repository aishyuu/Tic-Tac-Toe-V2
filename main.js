class Player {
    #mark
    constructor(marker) {
        this.#mark = marker
    }

    getMarker() {
        return this.#mark
    }
}

class Game {
    #board
    #whoIsPlaying
    #playerOne
    #playerTwo
    #gameConditionText

    constructor() {
        this.#board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.#whoIsPlaying = 1;
        this.#playerOne = new Player("X");
        this.#playerTwo = new Player("O");
        this.#gameConditionText = document.querySelector('.game-condition > h1');
    }

    createBoard() {
        const contentDiv = document.querySelector(".game-content");
        this.#gameConditionText.innerText = "X's turn"
        for (let index = 0; index < 9; index++) {
            const gameBox = document.createElement("div");
            gameBox.addEventListener('click', () => {
                if(this.#board[index] === 0) {
                    let player
                    if(this.#whoIsPlaying === 1) {
                        player = this.#playerOne
                    } else {
                        player = this.#playerTwo
                    }
                    this.markBoard(gameBox, player);
                    this.#board[index] = player.getMarker();
                    this.#whoIsPlaying = (this.#whoIsPlaying == 1 ? 2 : 1);
                    this.#gameConditionText.innerText = (this.#whoIsPlaying == 1 ? "X's turn" : "O's turn")
                    if(!this.checkWin(this.#board, player)) {
                        if(this.checkDraw(this.#board)) {
                            contentDiv.classList.add('game-concluded')
                            this.#gameConditionText.innerText = "Draw!"
                        }
                    } else {
                        this.#gameConditionText.innerText = `${player.getMarker()} wins!`
                        contentDiv.classList.add('game-concluded')
                    }
                }
            })
            gameBox.classList.add("game-box");
            contentDiv.appendChild(gameBox);
        }
        this.createReset(contentDiv);
    }

    createReset(contentDiv) {
        const resetDiv = document.querySelector('.reset-content');

        const resetButton = document.createElement("button");
        resetButton.innerText = "Reset"
        resetButton.classList.add("reset-button");
        resetButton.addEventListener('click', () => {
            const allBoxes = document.querySelectorAll(".game-box");
            for (let index = 0; index < allBoxes.length; index++) {
                allBoxes[index].innerHTML = ``;
                this.#board[index] = 0;
            }
            this.#whoIsPlaying = 1;
            this.#gameConditionText.innerText = "X's turn";
            contentDiv.classList.remove('game-concluded')
        })

        resetDiv.appendChild(resetButton);
    }

    checkWin(board, player) {
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

    checkDraw(board) {
        if(board.includes(0)) {
            return false
        }
        return true
    }

    markBoard(square, player) {
        square.innerHTML = `<h1>${player.getMarker()}</h1>`
    }

    playGame() {
        this.createBoard();
    }
}

const gameClass = new Game();

gameClass.playGame();