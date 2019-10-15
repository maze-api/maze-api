
const { Maze } = require('./Maze');
const { SquareCartesianCell } = require('./SquareCartesianCell');


class SquareMaze extends Maze {
  constructor(options) {
    super(options);

    this.makeCells();
    
    this.makeMaze();
    
    this.finalizeMaze();
  }

  makeCells() {

    this.maxX = this.dimensions.width;   /* min X index is 1 */
    this.maxY = this.dimensions.height;   /* min y index is 1 */
    this.cells = [];
    
    for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {
      this.cells[xIndex] = [];

      for(let yIndex = 1; yIndex <= this.maxY; yIndex++) {
        this.cells[xIndex][yIndex] = new SquareCartesianCell(xIndex, yIndex);
      }
    }
  }

  makeMaze() {
    const randomX = Math.floor(Math.random() * this.maxX) + 1;
    const randomY = Math.floor(Math.random() * this.maxY) + 1;

    let currentCell = this.getCell(randomX, randomY);
    if(!currentCell) throw `Exception: the address (${randomX}, ${randomY}) is invalid for this maze.`;

    this.active = [];
    currentCell.visited = true;
    this.active.push(currentCell);
    this.recurseMaze();
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


  printCells() {
    let output = ' ' + '__ '.repeat(this.maxX) + '\n';
    for(let yIndex = 2 * this.maxY; yIndex > 0; yIndex--) {
      
      for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {
        const cell = this.getCell(xIndex, Math.floor((yIndex + 1) / 2));
        const side = yIndex % 2 ? 'botString' : 'topString';
        output += (cell) ? cell.toString()[side] : '';
      }
      
      output += '|\n';
    }
    return output;
  }



  getDirections() {
    return [
      'n',
      's',
      'e',
      'w'
    ];
  }
    
  getDirectionOffset(direction) {
    const object = {
      n: { x: 0, y: +1 },
      s: { x: 0, y: -1 },
      e: { x: +1, y: 0 }, 
      w: { x: -1, y: 0 },
    };
    return object[direction];
  }
  getOppositeDirection(direction) {
    const object = {
      n: 's',
      s: 'n',
      e: 'w',
      w: 'e'
    };
    return object[direction];
  }
}

module.exports = {
  SquareMaze
};