function woven() {
  const randomX = Math.floor(Math.random() * this.maxX) + 1;
  const randomY = Math.floor(Math.random() * this.maxY) + 1;

  let currentCell = this.getCell(randomX, randomY);
  if(!currentCell) currentCell = this.getCell(randomX, randomY + 1);
  if(!currentCell) currentCell = this.getCell(randomX, randomY - 1);
  if(!currentCell) throw `Exception: the address (${randomX}, ${randomY}) is invalid for this maze.`;

  this.active = [];
  currentCell.visited = true;
  this.active.push(currentCell);
  recurseMaze.bind(this)();
}

function recurseMaze() {
  while(this.active.length > 0) {
    let currentCell = this.active[this.active.length - 1];

    const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
    const validDirections = potentialDirections.filter(dir => {
      return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
    });

    if(validDirections.length < 1) {
      this.active.pop();
    }
    else {
      const randomNumber = Math.floor(Math.random() * validDirections.length);
      const randomDirection = validDirections[randomNumber];
      const newCell = this.getCell(currentCell.x + this.getDirectionOffset(randomDirection).x, currentCell.y + this.getDirectionOffset(randomDirection).y);

      if(!newCell) throw 'Exception: internal error';

      currentCell.makeExit(randomDirection, newCell);
      newCell.makeExit(this.getOppositeDirection(randomDirection), currentCell);
      newCell.visited = true;
      this.active.push(newCell);
    }

    recurseMaze.bind(this)();
  }
}

module.exports = { woven };