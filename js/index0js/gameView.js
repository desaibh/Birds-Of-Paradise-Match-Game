//this version of the game can swapCells() but cannot checkWins()... see line 52
//since i could not pass the birdValue from function to Function, I had to recreate it on line 72-76. This is really inefficient.
class Game {
  constructor() {
    this.birdPicker = 0; //counter that randomly assigns bird background
    this.birdValue = [];
    this.birdChoice = ''; //string that retains class for bird background
    this.cellClass = ''; //classes assigned to each cell on gameboard
    this.cellId = ''; //id assigned to each cell on gameboard
    this.newChild = ''; //node for each cell div to be placed on gameboard
    this.winningCombos = []; //creates an array of all matches that are 4 or greater
    this.winCounter = 0; //helps to create the array of matches
    this.winArr = []; //array that's used to store the unique values of winning Combos
    this.scorer = 0;  // holds the value of the score;
  }
  startBoard() {
    //Generate Cells on Board & Assign Display Value for Cell
    for (let i=1; i<101; i++) {
      this.birdPicker = Math.floor(Math.random()*4+1);
      this.birdChoice = 'bird' + this.birdPicker;
      this.cellClass = 'cell ' + this.birdChoice;
      this.cellId = 'cell' + i;
      this.newChild = document.createElement('div');
      this.newChild.setAttribute('id', this.cellId);
      document.querySelector('div #board').appendChild(this.newChild);
      document.getElementById(this.cellId).className = this.cellClass;
    }
  }
  swapCells() {
    //Listen to a Click Event to Swap Cells
    this.click1ID; //records id of first click event
    this.click1Class; //records class of first click event
    this.click2ID; //records id of second click event
    this.click2Class;  //records class of first click event
    this.stringAdjacency1 = null; //evaluates whether the cell Ids are adjacent
    this.stringAdjacency2 = null; //evaluates whether the cell Ids are adjacent
    this.placeholder = null; //used to store click1ID during swap.
    document.getElementById('board').addEventListener("click", function(e){
      if(this.stringAdjacency1 == null ) {
        this.click1ID = event.target.id.toString();
        this.click1Class = event.target.className.toString();
        this.stringAdjacency1 = parseInt(this.click1ID.replace('cell',''));
        // event.target.className.style.background-color = 'green';
      } else if (this.stringAdjacency1 !== null){
        this.click2ID = event.target.id.toString();
        this.click2Class = event.target.className.toString();
        this.stringAdjacency2 = parseInt(this.click2ID.replace('cell',''));
        console.log(this.click1ID, this.click2ID)
        if (this.stringAdjacency1 + 1 == this.stringAdjacency2 || this.stringAdjacency1 - 1 == this.stringAdjacency2 ||  this.stringAdjacency1 + 10 == this.stringAdjacency2 || this.stringAdjacency1 - 10 == this.stringAdjacency2) {
          document.getElementById(this.click1ID).className = this.click2Class;
          document.getElementById(this.click2ID).className = this.click1Class;
          this.stringAdjacency1=null;
          this.stringAdjacency2=null;
          // this.checkWins();
        } else {
          //deselect
          this.stringAdjacency1=null;
          this.stringAdjacency2=null;
        }
      }

    });
  }
  checkWins() {
    while(this.winningCombos.length > 0) {
      this.winningCombos.pop();
    }
    while(this.winArr.length > 0) {
      this.winArr.pop();
    }

    for (let k = 1; k<=100; k++) {
      this.birdValue[k] = document.getElementById(`cell${[k]}`).className;;
      this.birdValue[k] = parseInt(this.birdValue[k].substr(this.birdValue[k].length - 1));
    }
      console.log(this.birdValue);

    // Checks Row Matches
    for (let i=1; i<=100; i=i+10) {
      for (let j=i+3; j<=i+9; j++) {
        if (this.birdValue[j] == this.birdValue[j-1] && this.birdValue[j-1] == this.birdValue[j-2] && this.birdValue[j-2] == this.birdValue[j-3]) {
          this.winningCombos[this.winCounter] = j;
          this.winningCombos[this.winCounter+1] = j-1;
          this.winningCombos[this.winCounter+2] = j-2;
          this.winningCombos[this.winCounter+3] = j-3;
          this.winCounter = this.winCounter+4;
        }
      }
    }
    // Check Column Matches
    for (let i=3; i<=10; i++) {
      for (let j=i*10+1; j<101; j++) {
        if (this.birdValue[j] == this.birdValue[j-10] && this.birdValue[j-10] == this.birdValue[j-20] && this.birdValue[j-20] == this.birdValue[j-30]) {
          this.winningCombos[this.winCounter] = j;
          this.winningCombos[this.winCounter+1] = j-10;
          this.winningCombos[this.winCounter+2] = j-20;
          this.winningCombos[this.winCounter+3] = j-30;
          this.winCounter = this.winCounter+4;
        }
      }
    }
    //Get the Unique Values from WinningCombos and Reset Array
    for (let wins in this.winningCombos) {
        if (this.winArr.indexOf(this.winningCombos[wins]) == -1) {
          this.winArr.push(this.winningCombos[wins]);
        }
    }
    this.winningCombos = [];
    this.winningCombos = this.winArr.slice(0);

    //Identify Cells that Are Reset, Sparkle, then Repopulate
    for (let wins of this.winningCombos) {
      this.cellId = 'cell' + wins;
      this.cellClass = 'cell reset';
      document.getElementById(this.cellId).className = this.cellClass;
      this.scorer = this.scorer + 10;
    }
    // document.onload = setTimeout(function resetBoard(){
      for (let wins of this.winningCombos) {
        this.cellId = 'cell' + wins;
        this.birdPicker = Math.floor(Math.random()*4+1);
        this.cellClass = 'cell bird' + this.birdPicker;
        document.getElementById(this.cellId).className = this.cellClass;
      }
    // }, 1000);
    this.updateScore(this.scorer);
  // this.checkWins();
  }
  updateScore (scorer) {
    this.scorer = scorer;
    document.getElementById('score').innerHTML = `<h4>${this.scorer}</h4>`;
    this.swapCells();
  }
  render() {
    this.startBoard();
    this.swapCells();
    this.checkWins();
    this.updateScore();
  }
}
const gameboard = new Game();
gameboard.render();

// Javascript Timer -- couldn't figure out how to add this to constructor
// Adapted from source: http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
function timer(duration) {
  let start = Date.now();
  let diff;
  let mins;
  let secs;
  function clock() {
    if (mins != 0 || secs != 0) {
      diff = duration - (((Date.now() - start) / 1000) | 0);
      mins = (diff/60) | 0;
      secs = (diff%60) | 0;
      mins = mins < 10 ? "0" + mins : mins;
      secs = secs < 10 ? "0" + secs : secs;
      document.querySelector('#timer').innerHTML = `<h3>${mins}:${secs}</h3>`;
    }
  }
  clock();
  setInterval(clock, 1000);
};
window.onload = function() {
  timer(120);
};
