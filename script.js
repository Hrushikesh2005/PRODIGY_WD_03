let currentPlayer = 'X';
        let gameMode = 'multiplayer';
        let gameOver = false;
        let computerPlayer = '';
        
        const box0 = document.querySelector(".box0"),
            box1 = document.querySelector(".box1"),
            board = document.querySelector(".board"),
            cells = document.querySelectorAll(".cell"),
            win = document.querySelector(".winner"),
            winnerText = document.querySelector(".winner-text");
        
        function selectMode(mode) {
            gameMode = mode;
            box0.classList.add("hide");
            box1.classList.remove("hide");
            console.log(`Mode selected: ${mode}`);
        }
        
        function selectPlayer(player){
            currentPlayer = player;
            computerPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // assigning opposite symbol
            console.log(`User selected player/ currentPlayer = ${currentPlayer} and computerPlayer = ${computerPlayer}`)
            box1.classList.add("hide");
            board.classList.add("show");

        }

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (cell.textContent === '' && !gameOver) {
                    cell.textContent = currentPlayer;
                    checkWin();
                    if (!gameOver) {
                        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                        if (gameMode === 'computer' && currentPlayer === computerPlayer) {
                            setTimeout(computerPlay, 500);
                        }
                    }
                }
            });
        });

        

        function computerPlay(){
            let emptyCells = Array.from(cells).filter(cell => cell.textContent === '');/* filters cells which are empty */
            if (emptyCells.length > 0 && !gameOver) {
                let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                randomCell.textContent = computerPlayer;
                console.log(`Computer Move: ${randomCell.id}, Computer Player: ${computerPlayer}`)
                
                checkWin();
                if(!gameOver){
                    currentPlayer = (currentPlayer === 'X') ?  'O' : 'X'; // assigning the opposite symbol for the user
                    console.log(`User symbol/ currentPlayer = ${currentPlayer}`)
                }   
           }
        }

        const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8]
        ];
        
        function winner(winner) {
            winnerText.innerText = ` PLAYER ${winner} IS THE WINNER !!!`;
            win.classList.add("show");
            gameOver = true;
        }
        
        function checkWin() {
            for (let pattern of winPatterns) {
                let cell1 = cells[pattern[0]].innerText;
                let cell2 = cells[pattern[1]].innerText;
                let cell3 = cells[pattern[2]].innerText;
        
                if (cell1 !== '' && cell1 === cell2 && cell2 === cell3) {
                    winner(cell1);
                    return;
                }
            }
            checkTie();
        }
        
        function checkTie() {
            if ([...cells].every(cell => cell.textContent !== '') && !gameOver) {
                winnerText.innerText = `It's a Tie!`;
                win.classList.add("show");
                gameOver = true;
            }
        }
        
        function playAgain() {
            box0.classList.remove("hide");
            board.classList.remove("show");
            win.classList.remove("show");
            cells.forEach(cell => cell.textContent = '');
            currentPlayer = '';
            gameOver = false;
            computerPlayer = '';
        }