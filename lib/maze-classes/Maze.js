const { recurseMaze } = require('./maze-methods/rectangular-maze-methods/maze-generation-algos');
const { calculateCellDistancesFromStart,
  setSolutionPathFromEndCoords,
  recursiveSetDistanceFromStart
} = require('./maze-methods/rectangular-maze-methods/finalize-maze-methods');


class Maze {
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

  recurseMaze() {
    return recurseMaze.bind(this);
  }

  finalizeMaze() {
    this.calculateCellDistancesFromStart();
    this.determineMazeEndAndDifficulty();
    this.setSolutionPathFromEndCoords();
  }
  
  calculateCellDistancesFromStart() {
    return calculateCellDistancesFromStart.bind(this);
  }

  recursiveSetDistanceFromStart() {
    return recursiveSetDistanceFromStart.bind(this);
  }

  setSolutionPathFromEndCoords() {
    return setSolutionPathFromEndCoords.bind(this);
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
  Maze
};