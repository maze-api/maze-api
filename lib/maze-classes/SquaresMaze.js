const { Maze } = require('./Maze');
const { SquareCell } = require('./SquareCell');

class SquaresMaze extends Maze {
  constructor(options) {
    super(options);

    this.cellShape = 'Square';
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
        this.cells[xIndex][yIndex] = new SquareCell(xIndex, yIndex);
      }
    }
  }

  printCells(showSolution, showDistances) {
    let output = ' ' + '▁▁▁ '.repeat(this.maxX) + '\n';
    for(let yIndex = 2 * this.maxY; yIndex > 0; yIndex--) {

      for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {

        const cell = this.getCell(xIndex, Math.floor((yIndex + 1) / 2));
        const side = yIndex % 2 ? 'botString' : 'topString';
        output += cell.toString(this.start, this.end, showSolution, showDistances)[side];
      }

      output += '│\n';
    }
    return output;
  }

  getRandomCell() {
    const randomX = Math.floor(Math.random() * this.maxX) + 1;
    const randomY = Math.floor(Math.random() * this.maxY) + 1;
    return this.getCell(randomX, randomY);
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
  SquaresMaze
};