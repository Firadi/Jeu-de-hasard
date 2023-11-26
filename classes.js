// Class Player

export class Player{
    tempScore;
    totalScore;
    name;
    rolls;
    constructor(name){
        this.name = name;
        this.tempScore = 0;
        this.totalScore = 0;
        this.rolls = 0;
    }
    setTempScore(tempScore){
        this.tempScore = tempScore;
        this.rolls++;
    }
    addTempScore(tempScore){
        this.tempScore += tempScore;
        this.rolls++;
    }
    setTotalScore(){
        this.totalScore += this.tempScore;
        this.tempScore = 0;
        this.rolls = 0;
    }
    didWin(target){
        let bool =  ((this.tempScore+this.totalScore) >= target);
        return bool;
    }
}

export class Game{  //MAIN CLASS
    actifPlayer;
    passifPlayer;
    target;
    numberOfDices;
    maxRolls;
    dice;
    stack;
    actif=false;
    constructor(target,numberOfDices,maxRolls,stack,name1,name2){
        this.target = target;
        this.dice = 0;
        this.numberOfDices = numberOfDices;
        this.maxRolls = maxRolls;
        this.stack = stack;
        this.setPlayers(name1,name2);
    }
    rollDice() {
        let random = Math.floor( ((Math.random() * 100) % 6) + 1);
        console.log(random,this.stack);
        if( !this.actifPlayer.didWin(this.target) ){
            if(random == this.stack){
                this.actifPlayer.setTempScore(0);
                this.switchPlayer();
            }
            else if ( (this.maxRolls > 0 && (this.actifPlayer.rolls < this.maxRolls - 1) ) || (this.maxRolls == 0) ) {
                this.dice = random;
                this.actifPlayer.addTempScore(this.dice);
                
            }
            else{
                console.log("Error: palayer" + this.actifPlayer.name + "has passed his max rolls");
                this.switchPlayer();
            }
        }
        else{
            this.actifPlayer.setTotalScore();
        }
        
    }
    switchPlayer(){
        if( !this.actifPlayer.didWin() ){
            this.actifPlayer.setTotalScore();
            let temp = this.actifPlayer;
            this.actifPlayer = this.passifPlayer;
            this.passifPlayer = temp; 
            this.actif = !this.actif;
        }
    }
    setPlayers(name1="Player 1", name2="Player 2"){
        this.actifPlayer = new Player(name1);
        this.passifPlayer = new Player(name2);
    }
    didWin(){
        return this.actifPlayer.didWin(this.target);
    }
}