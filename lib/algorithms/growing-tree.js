function growingTree() {
  let currentCell = this.getRandomCell();
  currentCell.visited = true;

  this.active = [];
  this.active.push(currentCell);

  growingTreeMaze.bind(this)();
}

function growingTreeMaze() {
  while(this.active.length > 0) {
    const frontCell = this.active[this.active.length - 1];

    let currentCell;

    if(this.active.length > 1) {
      const randomCellNumber = Math.floor(Math.random() * (this.active.length - 1));
      const randomCell = this.active[randomCellNumber];
      currentCell = randomCell;
      const cellOptions = [frontCell, randomCell];
      const randomChoiceNumber = Math.floor(Math.random() * 2);
      currentCell = cellOptions[randomChoiceNumber];
    }
    else {
      currentCell = frontCell;
    }

    const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
    const validDirections = potentialDirections.filter(dir => {
      return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
    });

    if(validDirections.length < 1) {

      const index = this.active.indexOf(currentCell);
      this.active.splice(index, 1);

    }
    else {
      const randomNumber = Math.floor(Math.random() * validDirections.length);
      const randomDirection = validDirections[randomNumber];
      const newCell = this.getCell(currentCell.x + this.getDirectionOffset(randomDirection).x, currentCell.y + this.getDirectionOffset(randomDirection).y);

      /* istanbul ignore next */
      if(!newCell) throw 'Exception: internal error';

      currentCell.makeExit(randomDirection, newCell);
      newCell.makeExit(this.getOppositeDirection(randomDirection), currentCell);
      newCell.visited = true;
      this.active.push(newCell);
    }

    growingTreeMaze.bind(this)();
  }
}

module.exports = {
  growingTree
};