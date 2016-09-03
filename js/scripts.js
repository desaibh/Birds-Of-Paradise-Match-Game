let birdPicker = 0; //counter that randomly assigns bird background
let birdValue = []; //array of birds used to check for winning combos;
let birdChoice = ''; //string that retains class for bird background
let cellClass = ''; //classes assigned to each cell on gameboard
let cellId = ''; //id assigned to each cell on gameboard
let newChild = ''; //node for cell div to be placed on gameboard
let countMatches = 0; //count the number of times a bird is matched in a sequence
let winningCombos = []; //creates an array of all matches that are 4 or greater
let winCounter = 0; //helps to create the array of matches
let winArr = []; //array that's used to store the unique values of winning Combos
let resetCounter = 0; //iterative counter that works with gravity function to reset values
let resetTester; //holds a boolean to test for whether a reset has occurred;
let resetBird; // holds the value of the birdChoice
let click1ID; //records id of first click event
let click1Class; //records class of first click event
let click2ID; //records id of second click event
let click2Class;  //records class of first click event
let stringAdjacency1 = null; //evaluates whether the cell Ids are adjacent
let stringAdjacency2 = null; //evaluates whether the cell Ids are adjacent

//Generate Cells on Board & Assign Display Value for Cell
for (let i=1; i<101; i++) {
  birdPicker = Math.floor(Math.random()*4+1);
  birdValue[i] = birdPicker;
  birdChoice = 'bird' + birdPicker;
  cellClass = 'cell ' + birdChoice;
  cellId = 'cell' + i;
  newChild = document.createElement('div');
  newChild.setAttribute('id', cellId);
  newChild.innerHTML = i;
  document.querySelector('div #board').appendChild(newChild);
  document.getElementById(cellId).className = cellClass;
}

// Checks Row Matches
for (let i=1; i<=100; i=i+10) {
  for (let j=i+3; j<=i+9; j++) {
    if (birdValue[j] == birdValue[j-1] && birdValue[j-1] == birdValue[j-2] && birdValue[j-2] == birdValue[j-3]) {
      winningCombos[winCounter] = j;
      winningCombos[winCounter+1] = j-1;
      winningCombos[winCounter+2] = j-2;
      winningCombos[winCounter+3] = j-3;
      winCounter = winCounter+4;
    }
  }
}

// Check Column Matches
for (let i=3; i<=10; i++) {
  for (let j=i*10+1; j<101; j++) {
    if (birdValue[j] == birdValue[j-10] && birdValue[j-10] == birdValue[j-20] && birdValue[j-20] == birdValue[j-30]) {
      winningCombos[winCounter] = j;
      winningCombos[winCounter+1] = j-10;
      winningCombos[winCounter+2] = j-20;
      winningCombos[winCounter+3] = j-30;
      winCounter = winCounter+4;
    }
  }
}

//Get the Unique Values from WinningCombos and Reset Array
let arr = [];
for (wins in winningCombos) {
		if (arr.indexOf(winningCombos[wins]) == -1) arr.push(winningCombos[wins]);
	}
winningCombos = [];
winningCombos = arr.slice(0);
console.log(winningCombos);

//Identify Cells that Are Reset, Sparkle, then Repopulate
for (wins of winningCombos) {
  cellId = 'cell' + wins;
  cellClass = 'cell reset';
  document.getElementById(cellId).className = cellClass;
}

//source: http://stackoverflow.com/questions/14226803/javascript-wait-5-seconds-before-executing-next-line
// function resetBoard(ms){
//   let start = new Date().getTime();
//   let end = start;
//   while(end < start + ms) {
//     end = new Date().getTime();
//   }
//   for (wins of winningCombos) {
//     birdPicker = Math.floor(Math.random()*4+1);
//     cellClass = 'cell bird' + birdPicker;
//     document.getElementById(cellId).className = cellClass;
//   }
// };
// resetBoard(1000);


//Listen to a Click Event to Swap Cells
document.getElementById('board').addEventListener("click", function(e){
  if(stringAdjacency1 == null ) {
    click1ID = event.target.id.toString();
    click1Class = event.target.className.toString();
    stringAdjacency1 = parseInt(click1ID.replace('cell',''));
  } else if(stringAdjacency1 !== null){
    click2ID = event.target.id.toString();
    click2Class = event.target.className.toString();
    stringAdjacency2 = parseInt(click2ID.replace('cell',''));
    if (stringAdjacency1 + 1 == stringAdjacency2 || stringAdjacency1 - 1 == stringAdjacency2 ||  stringAdjacency1 + 10 == stringAdjacency2 || stringAdjacency1 - 10 == stringAdjacency2) {
      document.getElementById(click1ID).className = click2Class;
      document.getElementById(click2ID).className = click1Class;
      //need to run checkwinners here
      stringAdjacency1=null;
      stringAdjacency2=null;
    } else {
      //deselect
      stringAdjacency1=null;
      stringAdjacency2=null;
    }
  }
});

// Javascript Timer
// source used as reference: https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
