// INPUTS +++++++++++++++++++++++++++++++++++
// const directionOffsets = {
//   n: { x: 0, y: +2 },
//   s: { x: 0, y: -2 },
//   ne: { x: +1, y: +1 },
//   se: { x: +1, y: -1 },
//   nw: { x: -1, y: +1 },
//   sw: { x: -1, y: -1 },
// };
// const oppositeDirections = {
//   n: 's',
//   s: 'n',
//   ne: 'sw',
//   se: 'nw',
//   nw: 'se',
//   sw: 'ne',
// };
// width & height
//
// ++++++++++++++++++++++++++++++++++++++++++++


createMaze(width, height, oppositeDirections, directionOffsets){
  const randomX = Math.floor(Math.random() * this.maxX) + 1;
  const randomY = Math.floor(Math.random() * this.maxY) + 1;
}



makeMaze(){
  const randomX = Math.floor(Math.random() * this.maxX) + 1;
  const randomY = Math.floor(Math.random() * this.maxY) + 1;

  let currentCell = this.getCell(randomX, randomY);
  if (!currentCell) currentCell = this.getCell(randomX, randomY + 1);
  if (!currentCell) currentCell = this.getCell(randomX, randomY - 1);
  if (!currentCell) throw `Exception: the address (${randomX}, ${randomY}) is invalid for this maze.`;

  this.active = [];
  currentCell.visited = true;
  this.active.push(currentCell);
  this.recurseMaze();
}

recurseMaze(){
  while (this.active.length > 0) {
    let currentCell = this.active[this.active.length - 1];

    const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
    const validDirections = potentialDirections.filter(dir => {
      return (this.getCell(currentCell.x + directionOffsets[dir].x, currentCell.y + directionOffsets[dir].y).visited === false);
    });

    if (validDirections.length < 1) {
      this.active.pop();
    }
    else {
      const randomNumber = Math.floor(Math.random() * validDirections.length);
      const randomDirection = validDirections[randomNumber];
      const newCell = this.getCell(currentCell.x + directionOffsets[randomDirection].x, currentCell.y + directionOffsets[randomDirection].y);

      if (!newCell) throw 'Exception: internal error';

      currentCell.makeExit(randomDirection, newCell);
      newCell.makeExit(oppositeDirections[randomDirection], currentCell);
      newCell.visited = true;
      this.active.push(newCell);
    }

    this.recurseMaze();
  }
}