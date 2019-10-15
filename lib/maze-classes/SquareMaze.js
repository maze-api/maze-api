const { RectangularMaze } = require('./RectangularMaze');
const { CartesianCell } = require('./CartesianCell');

class SquareMaze extends RectangularMaze {
  constructor(options) {
    super(options);

    this.makeCells();
    
    this.makeMaze();
    
    this.finalizeMaze();
  }

  finalizeMaze() {
    this.calculateCellDistancesFromStart();
    this.determineMazeEndAndDifficulty();
    this.setSolutionPathFromEndCoords();
  }

  makeCells() {
    this.maxX = this.dimensions.width;   /* min X index is 1 */
    this.maxY = this.dimensions.height;   /* min y index is 1 */
    this.cells = [];
    
    for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {
      this.cells[xIndex] = [];

      for(let yIndex = 1; yIndex <= this.maxY; yIndex++) {
        this.cells[xIndex][yIndex] = new CartesianCell(xIndex, yIndex);
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



  recurseMaze() {
    while(this.active.length > 0) {
      let currentCell = this.active[this.active.length - 1];

      const potentialDirections = this.getCellDirections(currentCell.x, currentCell.y);
      const validDirections = potentialDirections.filter(dir => {
        return (this.getCell(currentCell.x + this.getDirectionOffset(dir).x, currentCell.y + this.getDirectionOffset(dir).y).visited === false);
      });

      if(validDirections.length < 1) {
        this.active.pop();
      } 
      else {
        const randomNumber = Math.floor(Math.random() * validDirections.length);
        const randomDirection = validDirections[randomNumber];
        const newCell = this.getCell(currentCell.x + this.getDirectionOffset(randomDirection).x, currentCell.y + this.getDirectionOffset(randomDirection).y);

        if(!newCell) throw 'Exception: internal error';

        currentCell.makeExit(randomDirection, newCell);
        newCell.makeExit(this.getOppositeDirection(randomDirection), currentCell);
        newCell.visited = true;
        this.active.push(newCell);
      }

      this.recurseMaze();
    }
  }



  // printCells() {
  //   let output = '';

  //   for(let yIndex = (this.maxY + 1); yIndex >= 0; yIndex--) {
      
  //     for(let xIndex = 0; xIndex <= this.w + 1; xIndex++) {
  //       const cellSW = this.getCell(xIndex, yIndex);
  //       const cellNE = this.getCell(xIndex + 1, yIndex + 1);
  //       output += (cellSW) ? cellSW.toString(this.w, this.h).topString : '';
  //       output += (cellNE) ? cellNE.toString(this.w, this.h).botString : '';

  //       // if(cellSW) console.log('top: ', cellSW.x, cellSW.y);
  //       // if(cellNE) console.log('bot: ', cellNE.x, cellNE.y);
        
  //     }
  //     output += '\n';
  //   }
  //   return output;
  // }



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