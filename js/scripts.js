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

//Identify Cells that Are Reset
for (wins of winningCombos) {
  cellId = 'cell' + wins;
  cellClass = 'cell reset';
  document.getElementById(cellId).className = cellClass;
}

//Reset Board to Replace Winning Combinations // Gravity Function
// for (let i=101; i<=110; i++) {
//   for (let j=i-10; j>=1; j--) {
//     cellId = 'cell' + j;
//     console.log(cellId);
//     if (document.getElementById(cellId).classList.contains('reset')) {
//       resetCounter++;
//       resetTester = true;
//       resetCellId = 'cell' + (j-10);
//       console.log(j, 'reset counter ',cellId);
//     } // else if (resetCounter > 0) {
    //   console.log(j, 'reset cell Id ',resetCellId);
    //   document.getElementById(cellId) = document.getElementById(resetCellId);
    //   console.log(document.getElementById(CellId))
    //   resetCounter--;
    // }
//   }
// }

//Swap Cells

    document.getElementById('board').addEventListener("click", function(e){
       alert(event.target.id);
    });
