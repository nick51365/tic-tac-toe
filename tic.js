
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


    return{
        markSpace : function(i){
            if(gameBoard.boardSpaces[i] === ""){
                if (whosTurn === "playerOne"){
                    gameBoard.boardSpaces[i] = "X";
                    whosTurn = "playerTwo";
                    turnDisplay.innerHTML = "Player Two's Turn";
                }else if (whosTurn === "playerTwo"){
                    gameBoard.boardSpaces[i] = "O";
                    whosTurn = "playerOne";
                    turnDisplay.innerHTML = "Player One's Turn";
                }
                this.displayMarks();
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

