function finalizeMaze() {
  calculateCellDistancesFromStart.bind(this)();
  determineMazeEnd.bind(this)();
  setSolutionPath.bind(this)();
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


function setSolutionPath() {
  let currentCell = this.getCell(this.end.x, this.end.y);
  if(!currentCell) throw `Exception: the address (${this.end.x}, ${this.end.y}) is invalid for this maze.`;

  let solutionPath = [];
  let distance = currentCell.distanceFromStart;
  while(distance > 0) {
    currentCell.onSolutionPath = true;
    solutionPath.push({
      x: currentCell.x,
      y: currentCell.y
    });

    Object.entries(currentCell.exits).some(exitObj => {
      const exit = exitObj[1];
      const neighbor = this.getCell(exit.x, exit.y);

      if(neighbor && !neighbor.overpass && neighbor.distanceFromStart === distance - 1) {
        currentCell = neighbor;
        distance--;
        return true;
      }
      if(neighbor && neighbor.overpass) {
        if(neighbor.overpassDistanceFromStart === distance - 1 || neighbor.distanceFromStart === distance - 1) {
          const dir = exitObj[0];
          const otherSideCell = this.getCell(exit.x + this.getDirectionOffset(dir).x, exit.y + this.getDirectionOffset(dir).y);
          if(otherSideCell.distanceFromStart === distance - 2) {
            currentCell = neighbor;
            distance--;
            return true;
          }
        }
      }
      return false;
    });
  }

  currentCell = this.getCell(this.start.x, this.start.y);
  currentCell.onSolutionPath = true;
  solutionPath.push({
    x: currentCell.x,
    y: currentCell.y
  });

  this.solutionPath = solutionPath.reverse();
}


function recursiveSetDistanceFromStart(cell, distance) {
  cell.distanceFromStart = distance;

  if(cell.isLeaf) {
    this.numLeafCells++;
    return;
  }

  Object.entries(cell.exits).forEach(exitObj => {
    const exitCoords = exitObj[1];
    const newCell = this.getCell(exitCoords.x, exitCoords.y);

    if(newCell.overpass) {
      const dir = exitObj[0];

      const otherSideCell = this.getCell(newCell.x + this.getDirectionOffset(dir).x, newCell.y + this.getDirectionOffset(dir).y);
      if(otherSideCell.distanceFromStart === -1) {

        if(newCell.distanceFromStart === -1) {
          newCell.distanceFromStart = distance + 1;
        }
        else {
          newCell.overpassDistanceFromStart = distance + 1;
        }

        recursiveSetDistanceFromStart.bind(this)(otherSideCell, distance + 2);
      }
    }

    else {
      if(newCell.distanceFromStart === -1) recursiveSetDistanceFromStart.bind(this)(newCell, distance + 1);
    }
  });

}


module.exports = {
  finalizeMaze
};