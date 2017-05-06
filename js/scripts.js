var birdPicker = 0; // counter that randomly assigns bird background
sbirdValue = []; // array of birds used to check for winning combos;
var placeholder; // birdvalue placeholder for swap function
var birdChoice = ''; // string that retains class for bird background
var cellClass = ''; // classes assigned to each cell on gameboard
var cellId = ''; // id assigned to each cell on gameboard
var newChild = ''; // node for cell div to be placed on gameboard
var winningCombos = []; // creates an array of all matches that are 4 or greater
var winCounter = 0; // helps to create the array of matches
var winArr = []; // array that's used to store the unique values of winning Combos
var scorer = 0;  // holds the value of the score;
var click1ID; // records id of first click event
var click1Class; // records class of first click event
var click2ID; // records id of second click event
var click2Class;  // records class of second click event
var stringAdjacency1 = null; // evaluates whether the cell Ids are adjacent
var stringAdjacency2 = null; // evaluates whether the cell Ids are adjacent
var gameOver; // alerts user to gameOver

// Generate Cells on Board & Assign Display Value for Cell
for (var i = 1; i < 101; i++) {
  birdPicker = Math.floor(Math.random() * 4) + 1;
  birdValue[i] = birdPicker;
  birdChoice = 'bird' + birdPicker;
  cellClass = 'cell ' + birdChoice;
  cellId = 'cell' + i;
  newChild = document.createElement('div');
  newChild.setAttribute('id', cellId);
  document.querySelector('div #board').appendChild(newChild);
  document.getElementById(cellId).className = cellClass;
}

// Check Rows and Columns for Winning Combinations
function checkWins() {
  while (winningCombos.length > 0) {
    winningCombos.pop();
  }
  while (winArr.length > 0) {
    winArr.pop();
  }

  // Checks Row Matches
  for (var i = 1; i <= 100; i += 10) {
    for (var j = i + 3; j <= i + 9; j++) {
      if (birdValue[j] == birdValue[j - 1] &&
        birdValue[j - 1] == birdValue[j - 2] &&
        birdValue[j - 2] == birdValue[j - 3]) {
        winningCombos[winCounter] = j;
        winningCombos[winCounter + 1] = j - 1;
        winningCombos[winCounter + 2] = j - 2;
        winningCombos[winCounter + 3] = j - 3;
        winCounter += 4;
      }
    }
  }

  // Check Column Matches
  for (var i = 3; i <= 10; i++) {
    for (var j = (i * 10) + 1; j < 101; j++) {
      if (birdValue[j] == birdValue[j - 10] &&
        birdValue[j - 10] == birdValue[j - 20] &&
        birdValue[j - 20] == birdValue[j - 30]) {
        winningCombos[winCounter] = j;
        winningCombos[winCounter + 1] = j - 10;
        winningCombos[winCounter + 2] = j - 20;
        winningCombos[winCounter + 3] = j - 30;
        winCounter += 4;
      }
    }
  }

  // Get the Unique Values from WinningCombos and Reset Array
  for (var wins in winningCombos) {
    if (winArr.indexOf(winningCombos[wins]) == -1) {
      winArr.push(winningCombos[wins]);
    }
  }
  winningCombos = [];
  winningCombos = winArr.slice(0);

  // Identify Cells that Are Reset, Sparkle, then Repopulate
  for (var wins of winningCombos) {
    cellId = 'cell' + wins;
    cellClass = 'cell reset';
    document.getElementById(cellId).className = cellClass;
    if (!gameOver) {
      scorer += 10;
      if (winningCombos.length > 8) {
        scorer += 1000;
      }
    }
  }

  document.onload = setTimeout(function resetBoard() {
    for (var wins of winningCombos) {
      cellId = 'cell' + wins;
      birdPicker = Math.floor(Math.random() * 4) + 1;
      birdValue[wins] = birdPicker;
      cellClass = 'cell bird' + birdPicker;
      document.getElementById(cellId).className = cellClass;
    }
  }, 1000);

  // Update the Score
  document.getElementById('score').innerHTML = `<h4>${scorer}</h4>`;
}
checkWins();

// Listen to a Click Event to Swap Cells
document.getElementById('board').addEventListener('click', function (event) {
  if (stringAdjacency1 == null) {
    click1ID = event.target.id.toString();
    click1Class = event.target.className.toString();
    stringAdjacency1 = parseInt(click1ID.replace('cell', ''));
    document.getElementById(click1ID).classList.add('selected');
  } else if (stringAdjacency1 !== null) {
    click2ID = event.target.id.toString();
    click2Class = event.target.className.toString();
    stringAdjacency2 = parseInt(click2ID.replace('cell', ''));
    if (stringAdjacency1 + 1 == stringAdjacency2 ||
      stringAdjacency1 - 1 == stringAdjacency2 ||
      stringAdjacency1 + 10 == stringAdjacency2 ||
      stringAdjacency1 - 10 == stringAdjacency2) {
      document.getElementById(click1ID).className = click2Class;
      document.getElementById(click2ID).className = click1Class;
      placeholder = birdValue[stringAdjacency1];
      birdValue[stringAdjacency1] = birdValue[stringAdjacency2];
      birdValue[stringAdjacency2] = placeholder;
      checkWins();
      stringAdjacency1 = null;
      stringAdjacency2 = null;
    } else {
      // deselect
      stringAdjacency1 = null;
      stringAdjacency2 = null;
      document.getElementById(click1ID).classList.remove('selected');
    }
  }
});


// Javascript Timer
// Adapted from source: http:// stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
function timer(duration) {
  var start = Date.now();
  var diff;
  var mins;
  var secs;
  function clock() {
    if (mins != 0 || secs != 0) {
      diff = duration - (((Date.now() - start) / 1000) | 0);
      mins = (diff / 60) | 0;
      secs = (diff % 60) | 0;
      mins = mins < 10 ? '0' + mins : mins;
      secs = secs < 10 ? '0' + secs : secs;
      document.querySelector('#timer').innerHTML = `<h3>${mins}:${secs}</h3>`;
    } else {
      alert('Game Over! Play again soon... ');
      gameOver = true;
      clearInterval(myClock);
    }
  }
  clock();
  var myClock = setInterval(clock, 1000);
}
window.onload = function () {
  timer(120);
  var bgSound = document.getElementById('bgSound');
  bgSound.muted = true;
};

// Play Again function
document.querySelector('#playAgain').addEventListener('click', function() {
  window.location.reload();
});

// Mute Audio

function toggleAudio(bgSound) {
  var muteAudio = document.getElementById('muteAudio');
  if (muteAudio.innerHTML=="<h5>Play Audio</h5>") {
    bgSound.muted = false;
    muteAudio.innerHTML = "<h5>Mute Audio</h5>";
    console.log(bgSound, muteAudio.innerHTML)
  } else if (muteAudio.innerHTML=="<h5>Mute Audio</h5>") {
    bgSound.muted = true;
    console.log(bgSound, muteAudio.innerHTML)
    muteAudio.innerHTML = "<h5>Play Audio</h5>";
  }
}

document.querySelector('#muteAudio').addEventListener('click', function() {
  toggleAudio(bgSound);
}, false);




// Playing with changing colors for each letter
// var chars = document.getElementsByTagName('h1')[0].innerHTML.split('');
// chars.forEach(char, function() {
// const r = Math.floor(Math.random()*255);
// const g = Math.floor(Math.random()*255);
// const b = Math.floor(Math.random()*255);
// document.getElementsByTagName('h1')[0].style.backGroundColor = `rgb(${r}, ${g}, ${b})`;
// });
