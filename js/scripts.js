let birdPicker;
let birdChoice;
let cellClass;
let cellId;
let newChild;

//Generate Cells & Assign Display Value
for (i=1; i<101; i++) {
  birdPicker = Math.floor(Math.random()*4+1);
  birdChoice = 'bird' + birdPicker;
  cellClass = 'cell ' + birdChoice;
  cellId = 'cell' + i;
  newChild = document.createElement('div');
  newChild.setAttribute('id', cellId);
  document.querySelector('div #board').appendChild(newChild);
  document.getElementById(cellId).className = cellClass;
}

//
