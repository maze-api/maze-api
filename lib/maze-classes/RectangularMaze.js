
class RectangularMaze {
  constructor(options) {
    this.dimensions = {
      width: options.width,
      height: options.height
    };
    this.start = {
      x: options.startX,
      y: options.startY
    };
    this.numCells = options.width * options.height;
    this.numLeafCells = 0;
    this.topology = options.topology;
  }

  //possible
  calculateCellDistancesFromStart() {
  
    let currentCell = this.getCell(this.start.x, this.start.y);
    if(!currentCell) throw `Exception: the address (${this.start.x}, ${this.start.y}) is invalid for this maze.`;
    
    currentCell.isLeaf = false;
    this.recursiveSetDistanceFromStart(currentCell, 0);
  }

  setSolutionPathFromEndCoords() {
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
  
  exportMazeModel() {
    const flatCellMap = this.cells.reduce((flatCells, col) => {
      const flatCol = col
        .filter(cell => cell)
        .map(cell => ({
          coordinates: { 
            x: cell.x,
            y: cell.y
          },
          exits: cell.exits,
          overpass: false
        }));

      flatCells.push(...flatCol);
      return flatCells;
    }, []);

    return {
      topologyName: this.topology,
      algorithm: 'Recursive Back Tracker',
      dimensions: this.dimensions,
      difficulty: 'harder',
      connectivity: this.numLeafCells / this.numCells,
      averagePathLength: this.numCells / this.numLeafCells,
      start: this.start,
      end: this.end,
      solutionLength: this.solutionLength + 1,
      averageWrongPathLength: (this.numCells - this.solutionLength) / this.numLeafCells,
      solutionPath: this.solutionPath,
      cellMap: flatCellMap
    };
  }

  recursiveSetDistanceFromStart(cell, distance) {
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

  getCell(x, y) {
    if(!this.cells[x] || !this.cells[x][y]) return null;

    return this.cells[x][y];
  }

  getCellDirections(x, y) {
    const cell = this.getCell(x, y);
    if(!cell) return null;

    return this.getDirections().filter(dir => {
      return this.getCell(x + this.getDirectionOffset(dir).x, y + this.getDirectionOffset(dir).y);
    });
  }

  traverseCells(helper) {
    this.cells.forEach(col => col.forEach(cell => helper(cell)));
  }

}

module.exports = {
  RectangularMaze
};