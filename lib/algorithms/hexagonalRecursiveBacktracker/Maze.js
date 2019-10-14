const { HexCell } = require('./Cell');

const directions = [
  'n',
  's',
  'ne', 
  'se',
  'nw', 
  'sw',
];
const directionOffsets = {
  n: { x: 0, y: +2 },
  s: { x: 0, y: -2 },
  ne: { x: +1, y: +1 }, 
  se: { x: +1, y: -1 },
  nw: { x: -1, y: +1 }, 
  sw: { x: -1, y: -1 },
};
const oppositeDirections = {
  n: 's',
  s: 'n',
  ne: 'sw',
  se: 'nw',
  nw: 'se',
  sw: 'ne',
};


class HexMaze {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.numCells = w * h;
    this.numLeafCells = 0;
    this.maxX = w;   /* min X index is 1 */
    this.maxY = h * 2;   /* min y index is 1 */
    this.makeCells();

    this.active = [];
    this.makeMaze();

    this.start = { x: 1, y: 1 };
  }

  makeCells() {
    this.cells = [];
    
    for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {
      this.cells[xIndex] = [];

      for(let yIndex = 1; yIndex <= this.maxY; yIndex += 2) {
        const y = isEven(xIndex) ? yIndex + 1 : yIndex;
        this.cells[xIndex][y] = new HexCell(xIndex, y);
      }
    }
  }

  makeMaze() {
    const randomX = Math.floor(Math.random() * this.maxX) + 1;
    const randomY = Math.floor(Math.random() * this.maxY) + 1;

    let currentCell = this.getCell(randomX, randomY);
    if(!currentCell) currentCell = this.getCell(randomX, randomY + 1);
    if(!currentCell) currentCell = this.getCell(randomX, randomY - 1);
    if(!currentCell) throw `Exception: the address (${randomX}, ${randomY}) is invalid for this maze.`;

    currentCell.visited = true;
    this.active.push(currentCell);
    this.recurseMaze();
  }

  calculateDifficultiesFromStartingPoint(startX, startY) {
    let currentCell = this.getCell(startX, startY);
    if(!currentCell) throw `Exception: the address (${startX}, ${startY}) is invalid for this maze.`;

    this.start = { x: startX, y: startY };

    currentCell.isLeaf = false;
    this.recursiveSetDistanceFromStart(currentCell, 0);
  }

  solutionPathFromEndCoords(endX, endY) {
    let currentCell = this.getCell(endX, endY);
    if(!currentCell) throw `Exception: the address (${endX}, ${endY}) is invalid for this maze.`;

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
    return solutionPath.reverse();
  }

  exportMazeModel() {
    const flatCellMap = this.cells.reduce((flatCells, col) => {
      return [
        ...flatCells,
        col.map(cell => ({
          coordinates: { 
            x: cell.x,
            y: cell.y
          },
          exits: cell.exits,
          overpass: false
        }))
      ];
    }, []);

    const solutionPathArray = this.solutionPathFromEndCoords(this.end.x, this.end.y);

    return {
      topologyName: 'Hexagonal',
      algorithm: 'Recursive Back Tracker',
      dimensions: {
        height: this.h,
        width: this.w
      },
      difficulty: 'harder',
      connectivity: this.numLeafCells / this.numCells,
      averagePathLength: this.numCells / this.numLeafCells,
      start: this.start,
      end: this.end,
      solutionLength: this.solutionLength,
      averageWrongPathLength: (this.numCells - this.solutionLength) / this.numLeafCells,
      solutionPath: solutionPathArray,
      cellMap: flatCellMap
    };
  }

  recurseMaze() {
    while(this.active.length > 0) {
      let currentCell = this.active[this.active.length - 1];

      const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
      const validDirections = potentialDirections.filter(dir => {
        return (this.getCell(currentCell.x + directionOffsets[dir].x, currentCell.y + directionOffsets[dir].y).visited === false);
      });

      if(validDirections.length < 1) {
        this.active.pop();
      } 
      else {
        const randomNumber = Math.floor(Math.random() * validDirections.length);
        const randomDirection = validDirections[randomNumber];
        const newCell = this.getCell(currentCell.x + directionOffsets[randomDirection].x, currentCell.y + directionOffsets[randomDirection].y);

        if(!newCell) throw 'Exception: internal error';

        currentCell.makeExit(randomDirection, newCell);
        newCell.makeExit(oppositeDirections[randomDirection], currentCell);
        newCell.visited = true;
        this.active.push(newCell);
      }

      this.recurseMaze();
    }
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

    return directions.filter(dir => {
      return this.getCell(x + directionOffsets[dir].x, y + directionOffsets[dir].y);
    });
  }

  printCells() {
    let output = '';

    for(let yIndex = 2 * (this.h + 1); yIndex >= 0; yIndex--) {
      
      for(let xIndex = 0; xIndex <= this.w + 1; xIndex++) {
        const cellSW = this.getCell(xIndex, yIndex);
        const cellNE = this.getCell(xIndex + 1, yIndex + 1);
        output += (cellSW) ? cellSW.toString(this.w, this.h).topString : '';
        output += (cellNE) ? cellNE.toString(this.w, this.h).botString : '';

        // if(cellSW) console.log('top: ', cellSW.x, cellSW.y);
        // if(cellNE) console.log('bot: ', cellNE.x, cellNE.y);
        
      }
      output += '\n';
    }
    return output;
  }

  traverseCells(helper) {
    this.cells.forEach(col => col.forEach(cell => helper(cell)));
  }

}

const isEven = num => (num % 2) ? false : true;

module.exports = {
  HexMaze
};