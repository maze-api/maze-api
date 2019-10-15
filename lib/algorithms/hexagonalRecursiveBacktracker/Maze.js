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
  constructor(options) {
    this.w = options.width;
    this.h = options.height;
    this.numCells = options.width * options.height;
    this.numLeafCells = 0;
    this.leafCells = [];
    this.maxX = options.width;   /* min X index is 1 */
    this.maxY = options.height * 2;   /* min y index is 1 */
    this.makeCells();

    this.makeMaze();

    this.calculateCellDistancesFromStart(options.startX, options.startY);

    this.determineMazeEndAndDifficulty();
    // this.determineMazeEndAndDifficulty(options.difficulty, options.endX, options.endY);

    this.setSolutionPathFromEndCoords();
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

    this.active = [];
    currentCell.visited = true;
    this.active.push(currentCell);
    this.recurseMaze();
  }

  calculateCellDistancesFromStart(startX, startY) {
    this.start = { x: startX, y: startY };

    let currentCell = this.getCell(startX, startY);
    if(!currentCell) throw `Exception: the address (${startX}, ${startY}) is invalid for this maze.`;

    this.recursiveSetDistanceFromStart(currentCell, 0);
  }

  recursiveSetDistanceFromStart(cell, distance) {
    cell.distanceFromStart = distance;

    if(cell.isLeaf() && cell.distanceFromStart > 0) {
      this.numLeafCells++;
      this.leafCells.push(cell);
      return;
    }

    Object.values(cell.exits).forEach(exitCoords => {
      const newCell = this.getCell(exitCoords.x, exitCoords.y);
      if(newCell.distanceFromStart === -1) this.recursiveSetDistanceFromStart(newCell, distance + 1);
    });

  }

  determineMazeEndAndDifficulty(difficulty, endX, endY) {
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

    this.difficulty = 'Harder';
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

  calculateMazeEndAndDifficulty(difficulty, endX, endY) {
    //for each leaf backtrack to the beginning, while counting your steps
  
    //leave that number of steps on the first split you find

    //once all of the leaves are on splits, add the numbers on each split

    // treat those splits as the new leaves

    // difficulty is determined from the splits that are present on the correct solution path. 

    



    if(endX && endY){
      // look at how far from the start this point is
      const dist = this.getCell(endX, endY).distanceFromStart;
      // trace back to the beginning counting the number of times the player could turn off that path

    }


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
      topologyName: 'Hexagonal',
      algorithm: 'Recursive Back Tracker',
      dimensions: {
        height: this.h,
        width: this.w
      },
      difficulty: 'Harder',
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

  //NOTE: Cell array should be flattened
  // getCell(x, y) {
  //   if(!this.cells[x] || !this.cells[x][y]) return null;
  //   return this.cells[x][y];
  // }

  getCell(x, y) {
    return this.cells.flat().find(cell => {
      return cell.x === x && cell.y === y;
    });

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