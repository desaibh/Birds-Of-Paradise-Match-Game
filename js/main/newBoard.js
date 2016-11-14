class newBoard {
  constructor() {

  }
  newBoard() {
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


}
