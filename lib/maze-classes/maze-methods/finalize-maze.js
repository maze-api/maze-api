function finalizeMaze() {
  calculateCellDistancesFromStart.bind(this)();
  determineMazeEnd.bind(this)();
  setSolutionPathFromEndCoords.bind(this)();
}

function calculateCellDistancesFromStart() {

  let currentCell = this.getCell(this.start.x, this.start.y);
  if(!currentCell) throw `Exception: the address (${this.start.x}, ${this.start.y}) is invalid for this maze.`;

  currentCell.isLeaf = false;
  recursiveSetDistanceFromStart.bind(this)(currentCell, 0);
}


function determineMazeEnd() {

  const mazeEdgeCells = this.cells[this.maxX];

  const difficultyObject = mazeEdgeCells.reduce((obj, cell) => {

    if(cell.distanceFromStart > obj.long.distance) {
      return {
        long: { distance: cell.distanceFromStart, x: cell.x, y: cell.y },
      };
    }

    return obj;
  },
  {
    long: { distance: 0, x: -1, y: -1 },
  });

  if(!this.end.x && !this.end.y) {
    this.end.x = difficultyObject.long.x;
    this.end.y = difficultyObject.long.y;
  }
  this.solutionLength = difficultyObject.long.distance;
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
    if(newCell.distanceFromStart === -1) recursiveSetDistanceFromStart.bind(this)(newCell, distance + 1);
  });

}



module.exports = {
  finalizeMaze
};