
//gameBoard module
let gameBoard = (function (){
    
    //Returns all PUBLIC variables and functions
    return {
        boardSpaces : ["","","","","","","","",""]
    };
})();

//displayController module
let displayController = (function(){

    //Variable to hold name of player who's turn it currently is
    let whosTurn = "playerOne";

    //Initialize "turnDisplay" at beginning of game
    let turnDisplay = document.getElementById("turnDisplay");
    turnDisplay.innerHTML = "Player One's Turn";

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
                    alert("Player One Wins!");
                }else{
                    alert("Player Two Wins!");
                }       
                gameBoard.boardSpaces = ["","","","","","","","",""];
                displayController.displayMarks();
                turnDisplay.innerHTML = "Player One's Turn"
                whosTurn = "playerOne";
            };
        },50); 
    };
    //Checks if the game has reached a tie with no more available spaces
    //If so, announces a tie and resets the board
    let checkTie = function(){
        for (i = 0; i < gameBoard.boardSpaces.length; i++){
            if (gameBoard.boardSpaces[i] === ""){
                console.log(gameBoard.boardSpaces[i]);
                break;
            };
            console.log("TIE");
        };
    };

    return{
        markSpace : function(i){
            if(gameBoard.boardSpaces[i] === ""){
                if (whosTurn === "playerOne"){
                    gameBoard.boardSpaces[i] = "X";
                    this.displayMarks();
                    checkWin();
                    checkTie();
                    whosTurn = "playerTwo";
                    turnDisplay.innerHTML = "Player Two's Turn";
                }else if (whosTurn === "playerTwo"){
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
    };
    
})();

//player factory function
const playerFactory = (marker) => {
    return {marker};
};

//Add event listeners to boardSpaces
let spaces = document.querySelectorAll(".boardSpace");
for (i = 0; i < spaces.length; i++){
    let pos = i;
    spaces[i].addEventListener("click", () => {
        displayController.markSpace(pos);
    })
};

displayController.displayMarks();
const playerOne = playerFactory("X");
const playerTwo = playerFactory("O");

