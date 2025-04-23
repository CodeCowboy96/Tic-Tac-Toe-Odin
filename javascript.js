const gameBoard = (function () {
    const board = [
        [null, null, null,],
        [null, null, null,],
        ['O', 'O', 'O',]
    ];
    return board;
})();
    //object to handle game board state 
    //first store an empty 3x3 array 
    //take in either X or O at a specified position within the array 
    //update display to show last players choice and current game board

const gameState = (function(){
    function checkWinner(board) {
        const lines = [
            // Rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            // Columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            // Diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];

        for (const line of lines) {
            if (line.every(cell => cell === 'X')) return 'Player 1 (X) wins';
            if (line.every(cell => cell === 'O')) return 'Player 2 (O) wins';
        }

        return 'No winner yet';
    }

    
    return {
        evaluate: () => checkWinner(gameBoard)
    };
    
    //needs to run every time game board changes
    //checks gameBoard array for 3 X's or 3 O's in a row in any direction.
    //declares winner if above winning condition is met.
})();
console.log(gameState.evaluate());

const players = (function people (playerOneName = 'Will', playerTwoName = 'Billy') {
    return {
        playerOne: { name: playerOneName, marker: 'X' },
        playerTwo: { name: playerTwoName, marker: 'O' }
    };
})();

    //needs to store up to 2 player names
    // assign X's to player 1 and O's to player 2


