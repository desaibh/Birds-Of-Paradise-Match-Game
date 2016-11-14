class App {
  constructor () {
  }
  swap() {
    //Listen to a Click Event to Swap Cells
    document.getElementById('board').addEventListener("click", function(e){
      if(this.stringAdjacency1 == null ) {
        this.click1ID = event.target.id.toString();
        this.click1Class = event.target.className.toString();
        this.stringAdjacency1 = parseInt(click1ID.replace('cell',''));
      } else if(this.stringAdjacency1 !== null){
        this.click2ID = event.target.id.toString();
        this.click2Class = event.target.className.toString();
        this.stringAdjacency2 = parseInt(click2ID.replace('cell',''));
        if (this.stringAdjacency1 + 1 == this.stringAdjacency2 || this.stringAdjacency1 - 1 == this.stringAdjacency2 ||  this.stringAdjacency1 + 10 == this.stringAdjacency2 || this.stringAdjacency1 - 10 == this.stringAdjacency2) {
          document.getElementById(this.click1ID).className = this.click2Class;
          document.getElementById(this.click2ID).className = this.click1Class;
          this.placeholder = this.birdValue[this.stringAdjacency1]
          this.birdValue[this.stringAdjacency1] = this.birdValue[this.stringAdjacency2];
          this.birdValue[this.stringAdjacency2] = this.placeholder;
          checkWins();
          this.stringAdjacency1=null;
          this.stringAdjacency2=null;
        } else {
          //deselect
          this.stringAdjacency1=null;
          this.stringAdjacency2=null;
        }
      }
    });
  }
}
