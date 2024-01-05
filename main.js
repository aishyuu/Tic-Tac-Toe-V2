const gameBoard = (function () {
    const board = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
    const display = () => {
        let text = ""
        text += "-------\n"
        for (let index = 0; index < board.length; index++) {
            const element = board[index];
            if((index + 1) % 3 != 0) {
                text += `${board[index]} |`
            } else {
                text += `${board[index]}\n-------\n`
            }
        }
        return text;
    }

    const mark = (index, marker) => {
        if(board[index] != "0") {
            console.log("That position already has a marker");
        } else {
            board[index] = marker;
        }
    };

    const checkWinner = (marker) => {
        console.log("Checking if marker is a winner.");
    };

    return {display, mark, checkWinner};
})();