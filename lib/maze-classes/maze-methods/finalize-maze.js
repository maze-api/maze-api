function finalizeMaze() {
  calculateCellDistancesFromStart.bind(this)();
  determineMazeEndAndDifficulty.bind(this)();
  console.log(this.printCells());
  setSolutionPath.bind(this)();
}

function calculateCellDistancesFromStart() {

  let currentCell = this.getCell(this.start.x, this.start.y);
  if(!currentCell) throw `Exception: the address (${this.start.x}, ${this.start.y}) is invalid for this maze.`;

  currentCell.isLeaf = false;
  recursiveSetDistanceFromStart.bind(this)(currentCell, 0);
}

function setSolutionPath() {
  let currentCell = this.getCell(this.end.x, this.end.y);
  if(!currentCell) throw `Exception: the address (${this.end.x}, ${this.end.y}) is invalid for this maze.`;

  let solutionPath = [];
  let distance = currentCell.distanceFromStart;
  while(distance > 0) {
    if(currentCell.onSolutionPath) distance = 0;

    currentCell.onSolutionPath = true;
    solutionPath.push({
      x: currentCell.x,
      y: currentCell.y
    });

    console.log(distance);
    Object.values(currentCell.exits).some(exit => {
      const neighbor = this.getCell(exit.x, exit.y);

      if(neighbor.overpass) console.log(neighbor);
      
      if(neighbor && neighbor.distanceFromStart === distance - 1) {
        console.log(currentCell.x, currentCell.y, '->', neighbor.x, neighbor.y);
        currentCell = neighbor;
        distance = neighbor.distanceFromStart;
        return true;
      }
      if(neighbor && neighbor.overpass && neighbor.overpassDistanceFromStart === distance - 1) {
        console.log(currentCell.x, currentCell.y, '->', neighbor.x, neighbor.y);
        console.log(neighbor);
        currentCell = neighbor;
        distance = neighbor.overpassDistanceFromStart;
        return true;
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
      if(newCell.distanceFromStart === -1) newCell.distanceFromStart = distance + 1;
      else newCell.overpassDistanceFromStart = distance + 1;
      
      const dir = exitObj[0];
      const otherSideCell = this.getCell(newCell.x + this.getDirectionOffset(dir).x, newCell.y + this.getDirectionOffset(dir).y);
      if(otherSideCell.distanceFromStart === -1) {
        recursiveSetDistanceFromStart.bind(this)(otherSideCell, distance + 2);
      }
    }

    else {
      if(newCell.distanceFromStart === -1) recursiveSetDistanceFromStart.bind(this)(newCell, distance + 1);
    }
  });

}

function determineMazeEndAndDifficulty(difficulty, endX, endY) {
  this.end = { x: endX, y: endY };

  if(difficulty) {
    this.difficulty = difficulty;
    console.log('need to code "findEndByDifficulty".');
    return;
    // this.findEndByDifficulty(difficulty);
    // return;
  }

  if(endX && endY) {
    console.log('need to code "findDifficultyAtEnd"');
    return;
    // this.difficulty = this.findDifficultyAtEnd(endX, endY);
    // return;
  }

  this.difficulty = 'harder';
  // const mazeEdgeCells = [
  //   ...this.cells[1],
  //   ...this.cells[this.maxX],
  //   ...this.cells.filter(cell => cell.y <= 2 || cell.y <= 2 * this.maxY - 1),
  // ];
  const mazeEdgeCells = this.cells[this.maxX];
  console.log('TBD: considering right edge of maze for end cells');

  const difficultyObject = mazeEdgeCells.reduce((obj, cell) => {

    if(cell.distanceFromStart > obj.long.distance) {
      return {
        long: { distance: cell.distanceFromStart, x: cell.x, y: cell.y },
        short: obj.short
      };
    }
    if(!obj.short.distance || cell.distanceFromStart < obj.short.distance) {
      return {
        long: obj.long,
        short: { distance: cell.distanceFromStart, x: cell.x, y: cell.y }
      };
    }
    return obj;
  },
  {
    long: { distance: 0, x: -1, y: -1 },
    short: { distance: 0, x: -1, y: -1 }
  });

  this.end.x = difficultyObject.long.x;
  this.end.y = difficultyObject.long.y;
  this.solutionLength = difficultyObject.long.distance;
}


module.exports = {
  finalizeMaze
};