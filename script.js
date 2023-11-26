import {Game} from "./classes.js";

// Getting DOM elements
    //Events
    let start = document.querySelector(".start");
    let roll = document.querySelector(".roll");
    let pass = document.querySelector(".pass");
    //Affichage
    let playerName1 = document.querySelector(".playerName1");
    let playerName2 = document.querySelector(".playerName2");
    let playerTempScore1 = document.querySelector(".playerTempScore1");
    let playerTempScore2 = document.querySelector(".playerTempScore2");
    let playerTotalScore1 = document.querySelector(".playerTotalScore1");
    let playerTotalScore2 = document.querySelector(".playerTotalScore2");
    let diceFace = document.querySelector(".diceFace");
    let playerIcon1 = document.querySelector(".playerIcon1");
    let playerIcon2 = document.querySelector(".playerIcon2");
    let pyro = document.querySelector(".pyro");



// Adding eventListners
start.addEventListener("click",init);

function init(){

    // Getting  informatios 
    let name1 = document.querySelector(".name1").value;
    let name2 = document.querySelector(".name2").value;
    let target = document.querySelector(".target").value;
    let nbrDice = document.querySelector(".nbrDice").value;
    let maxRoll = document.querySelector(".maxRoll").value;
    let stack = parseInt(document.querySelector(".stack").value);

    // GAME initialisation
    let game = new Game(target,nbrDice,maxRoll,stack,name1,name2);
    affichageInitial(game);
    
    roll.addEventListener("click",()=>{
        game.rollDice();

        affichage(game);
    });
    
    pass.addEventListener("click",()=>{
        game.switchPlayer();
        
        affichage(game);
    });
    affichage(game);
}

// AFFICHAGE
function affichageInitial(game){
    playerName1.innerHTML = game.actifPlayer.name;
    playerName2.innerHTML = game.passifPlayer.name;
    playerTempScore1.innerHTML = game.actifPlayer.tempScore;
    playerTotalScore1.innerHTML = game.actifPlayer.totalScore;
    playerTempScore2.innerHTML = game.passifPlayer.tempScore;
    playerTotalScore2.innerHTML = game.passifPlayer.totalScore;
}
function affichage(game){
    if(!game.actif){
        playerTempScore1.innerHTML = game.actifPlayer.tempScore;
        playerTotalScore1.innerHTML = game.actifPlayer.totalScore;
        playerTempScore2.innerHTML = game.passifPlayer.tempScore;
        playerTotalScore2.innerHTML = game.passifPlayer.totalScore;
    }else{
        playerTempScore1.innerHTML = game.passifPlayer.tempScore;
        playerTotalScore1.innerHTML = game.passifPlayer.totalScore;
        playerTempScore2.innerHTML = game.actifPlayer.tempScore;
        playerTotalScore2.innerHTML = game.actifPlayer.totalScore;
    }
    affichageDice(game);
    switchStatus(game);
    winner(game);
}
function affichageDice(game){
    if(game.dice == 0){
        diceFace.style.display = "none";
    }else{
        diceFace.style.display = "block";
        diceFace.setAttribute("src","faces/dado-0" + (game.dice+1) + ".png");
    } 
        
}
function switchStatus(game){
    if(!game.actif){
        // temp score color
        playerTempScore1.classList.add("text-bg-success");
        playerTempScore1.classList.remove("text-bg-secondary");
        playerTempScore2.classList.remove("text-bg-success");
        playerTempScore2.classList.add("text-bg-secondary");

        
    }
    else{
        // temp score color
        playerTempScore1.classList.remove("text-bg-success");
        playerTempScore1.classList.add("text-bg-secondary");
        playerTempScore2.classList.add("text-bg-success");
        playerTempScore2.classList.remove("text-bg-secondary");
    }
    playerIcon2.classList.toggle("hide");
    playerIcon1.classList.toggle("hide");
}
function winner(game){
    if(game.actifPlayer.didWin(game.target) && !game.actif){
        playerName1.innerHTML = "VINQEUR !!";
    }
    else if(game.actifPlayer.didWin(game.target) && game.actif){
        playerName2.innerHTML = "VINQEUR !!";
    }
    
}
