//setup interaction in the console so the board can take in player moves 
    //the game should alternate back and forth between players taking turns, each placing one marker per turn

const gameBoard = (function () {
    const board = [
        [null, null, null,],
        [null, null, null,],
        [null, null, null,]
    ];
    function printBoard() {
        console.clear();
        console.log('\nCurrent Board:');
        board.forEach(row => console.log(row.map(cell => cell || '-').join(' ')));
    }

    function makeMove(row, col, marker) {
        if (board[row][col] !== null) {
            alert('Cell already taken. Try again.');
            return false;
        }
        board[row][col] = marker;
        return true;
    }

    return { board, printBoard, makeMove };
})();

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

        return null;
    }

    return {
        evaluate: () => checkWinner(gameBoard.board)
    };
})();

const players = (function people (playerOneName = 'Will', playerTwoName = 'Billy') {
    return {
        playerOne: { name: playerOneName, marker: 'X' },
        playerTwo: { name: playerTwoName, marker: '0' }
    };
})();

(function startGame() {
    let currentPlayer = players.playerOne;
    let moveCount = 0;

    while (true) {
        gameBoard.printBoard();
        const input = prompt(`${currentPlayer.name} (${currentPlayer.marker}), enter your move as row,col:`);

        if (!input) {
            alert('Game cancelled.');
            break;
        }

        const [row, col] = input.split(',').map(s => Number(s.trim()));
        if ([row, col].some(n => isNaN(n) || n < 0 || n > 2)) {
            alert('Invalid input. Use numbers between 0-2.');
            continue;
        }

        const success = gameBoard.makeMove(row, col, currentPlayer.marker);
        if (!success) continue;

        moveCount++;
        const result = gameState.evaluate();
        if (result) {
            gameBoard.printBoard();
            alert(result);
            break;
        }

        if (moveCount === 9) {
            gameBoard.printBoard();
            alert("It's a draw!");
            break;
        }

        currentPlayer = (currentPlayer === players.playerOne) ? players.playerTwo : players.playerOne;
    }
})();


