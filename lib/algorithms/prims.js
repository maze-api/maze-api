function prims() {
  const randomX = Math.floor(Math.random() * this.maxX) + 1;
  const randomY = Math.floor(Math.random() * this.maxY) + 1;

  let currentCell = this.getCell(1, 1);
  if(!currentCell) currentCell = this.getCell(randomX, randomY + 1);
  if(!currentCell) currentCell = this.getCell(randomX, randomY - 1);
  if(!currentCell) throw `Exception: the address (${randomX}, ${randomY}) is invalid for this maze.`;
  currentCell.visited = true;

  const neighbors = [];

  const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
  const validDirections = potentialDirections.filter(dir => {
    return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
  });
  
  validDirections.forEach(dir => {
    const neighbor = {
      coordinate: {
        x: currentCell.x + this.getDirectionOffset(dir).x,
        y: currentCell.y + this.getDirectionOffset(dir).y, 
      },
      originator: {
        x: currentCell.x,
        y: currentCell.y
      },
      directionFromOriginator: dir
    };
    neighbors.push(neighbor);
    this.getCell(neighbor.coordinate.x, neighbor.coordinate.y).visited = true;
  });
  console.log(neighbors);
  
  recur.bind(this)(neighbors);
}

function recur(neighbors) {

  while(neighbors.length) {

    const nextChosen = neighbors.splice([Math.floor(Math.random() * neighbors.length)], 1)[0];
    
    const currentCell = this.getCell(nextChosen.coordinate.x, nextChosen.coordinate.y);
    
    const originCell = this.getCell(nextChosen.originator.x, nextChosen.originator.y);

    currentCell.makeExit(this.getOppositeDirection(nextChosen.directionFromOriginator), originCell);

    originCell.makeExit(nextChosen.directionFromOriginator, currentCell);

    const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
    const validDirections = potentialDirections.filter(dir => {
      return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
    });
    
    validDirections.forEach(dir => {
      const neighbor = {
        coordinate: {
          x: currentCell.x + this.getDirectionOffset(dir).x,
          y: currentCell.y + this.getDirectionOffset(dir).y, 
        },
        originator: {
          x: currentCell.x,
          y: currentCell.y
        },
        directionFromOriginator: dir
      };
      neighbors.push(neighbor);
      this.getCell(neighbor.coordinate.x, neighbor.coordinate.y).visited = true;
    });

    recur.bind(this)(neighbors);
  }
  
}

module.exports = {
  prims
};