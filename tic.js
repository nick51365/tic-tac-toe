//gameBoard module
let gameBoard = (function (){
    
    return {
        boardSpaces : ["","","","","","","","",""]
    };
})();

//displayController module
let displayController = (function(){

    //Variable to hold name of player who's turn it currently is
    let whosTurn = "playerOne";

    //Total number of moves made. For use determining if a tie has occured
    let movesMade = 0;

    //Initialize "turnDisplay" at beginning of game
    let turnDisplay = document.getElementById("turnDisplay");
    turnDisplay.innerHTML = "Player One's Turn";

    //Check if a winning combination of spaces has been filled
    let checkWin = function(){
        let winner = "";   
        let winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        //Iterate through winningCombos to check if any are completed
        for (i = 0;i < winningCombos.length; i++){
            if (gameBoard.boardSpaces[winningCombos[i][0]] != ""){
                if (gameBoard.boardSpaces[winningCombos[i][0]] === gameBoard.boardSpaces[winningCombos[i][1]] &&
                    gameBoard.boardSpaces[winningCombos[i][1]] === gameBoard.boardSpaces[winningCombos[i][2]]){
                    winner = whosTurn;
                };
            }
        };
        //If a winner is declared, announce winner and clear board
        setTimeout(function(){
            if (winner != ""){
                if (winner === "playerOne"){
                    turnDisplay.innerHTML = "Player One Wins!";
                }else{
                    turnDisplay.innerHTML = "Player Two Wins!";
                }       
            };
        },0); 
    };
    //Checks if the game has reached a tie 
    //If so, announces a tie and resets the board
    let checkTie = function(){
        if (movesMade === 9){
            setTimeout(function(){
                turnDisplay.innerHTML = "Tie!";
            },0);
        }
    };

    return{
        markSpace : function(i){
            if(gameBoard.boardSpaces[i] === ""){
                if (whosTurn === "playerOne"){
                    movesMade++;
                    gameBoard.boardSpaces[i] = "X";
                    this.displayMarks();
                    checkWin();
                    checkTie();
                    whosTurn = "playerTwo";
                    turnDisplay.innerHTML = "Player Two's Turn";
                }else if (whosTurn === "playerTwo"){
                    movesMade++;
                    gameBoard.boardSpaces[i] = "O";
                    this.displayMarks();
                    checkWin();
                    checkTie();
                    whosTurn = "playerOne";
                    turnDisplay.innerHTML = "Player One's Turn";
                }

            }
        },
        displayMarks : function(){
            //Iterates through "gameBoard.boardSpaces" array and displays
            //contents in corresponding "boardSpace" divs
            for (i = 0; i < gameBoard.boardSpaces.length; i++){
                let space = document.getElementById("space"+[i]);
                space.innerHTML = gameBoard.boardSpaces[i];
            }
        },
        resetGame : function(){
            gameBoard.boardSpaces = ["","","","","","","","",""];
            displayController.displayMarks();
            turnDisplay.innerHTML = "Player One's Turn"
            whosTurn = "playerOne";
            movesMade = 0;
        },
    };
    
})();

//player factory function
const playerFactory = (marker) => {
    return {marker,name};
};

//Add event listeners to boardSpaces
let spaces = document.querySelectorAll(".boardSpace");
for (i = 0; i < spaces.length; i++){
    let pos = i;
    spaces[i].addEventListener("click", () => {
        displayController.markSpace(pos);
    })
};

//Add event listener to reset button
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click",() => displayController.resetGame());

//Create two player objects
const playerOne = playerFactory("X");
const playerTwo = playerFactory("O");

