function calculateCellDistancesFromStart() {
  
  let currentCell = this.getCell(this.start.x, this.start.y);
  if(!currentCell) throw `Exception: the address (${this.start.x}, ${this.start.y}) is invalid for this maze.`;
  
  currentCell.isLeaf = false;
  this.recursiveSetDistanceFromStart(currentCell, 0);
}

function setSolutionPathFromEndCoords() {
  let currentCell = this.getCell(this.end.x, this.end.y);
  if(!currentCell) throw `Exception: the address (${this.end.x}, ${this.end.y}) is invalid for this maze.`;

  let solutionPath = [];
  let distance = currentCell.distanceFromStart;
  while(distance > 0) {
    solutionPath.push({ 
      x: currentCell.x, 
      y: currentCell.y 
    });
    
    Object.values(currentCell.exits).some(exit => {
      const neighbor = this.getCell(exit.x, exit.y);
      if(neighbor && neighbor.distanceFromStart < distance) {
        currentCell = neighbor;
        distance = neighbor.distanceFromStart;
        return true;
      }
      return false;
    });
  }

  solutionPath.push({ 
    x: this.start.x, 
    y: this.start.y 
  });

  this.solutionPath = solutionPath.reverse();
}

function recursiveSetDistanceFromStart(cell, distance) {
  cell.distanceFromStart = distance;

  if(cell.isLeaf) {
    this.numLeafCells++;
    return;
  }

  Object.values(cell.exits).forEach(exitCoords => { 
    const newCell = this.getCell(exitCoords.x, exitCoords.y);
    if(newCell.distanceFromStart === -1) this.recursiveSetDistanceFromStart(newCell, distance + 1);
  });

}



module.exports = {
  calculateCellDistancesFromStart,
  setSolutionPathFromEndCoords,
  recursiveSetDistanceFromStart
};