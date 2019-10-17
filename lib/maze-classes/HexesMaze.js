const { Maze } = require('./Maze');
const { HexCell } = require('./HexCell');

class HexesMaze extends Maze {
  constructor(options) {
    super(options);

    this.makeCells();

    this.makeMaze();

    this.finalizeMaze();
  }

  makeCells() {
    this.maxX = this.dimensions.width;   /* min X index is 1 */
    this.maxY = this.dimensions.height * 2;   /* min y index is 1 */
    this.cells = [];

    for(let xIndex = 1; xIndex <= this.maxX; xIndex++) {
      this.cells[xIndex] = [];

      for(let yIndex = 1; yIndex <= this.maxY; yIndex += 2) {
        const y = isEven(xIndex) ? yIndex + 1 : yIndex;
        this.cells[xIndex][y] = new HexCell(xIndex, y);
      }
    }
  }

  printCells(showSolution = true, showDistances = false) {
    let output = ' ' + '    ▁▁  '.repeat(Math.floor(this.maxX / 2)) + '\n';

    for(let yIndex = this.maxY; yIndex >= 0; yIndex--) {

      for(let xIndex = 0; xIndex <= this.maxX + 1; xIndex++) {
        const cellSW = this.getCell(xIndex, yIndex);
        const cellNE = this.getCell(xIndex + 1, yIndex + 1);
        if(cellSW) {
          output += cellSW.toString(this.dimensions.width, this.end, showSolution, showDistances).topString;
        }
        else if(yIndex >= this.maxY && xIndex >= 1 && xIndex <= this.maxX) {
          output += (xIndex === 1) ? ' ▁▁ ' : '\\▁▁ ';
        }
        output += (cellNE) ? cellNE.toString(this.dimensions.width, this.end, showSolution, showDistances).botString : '';
      }
      output += '\n';
    }
    return output;
  }

  getDirections() {
    return [
      'n',
      's',
      'ne',
      'se',
      'nw',
      'sw',
    ];
  }

  getDirectionOffset(direction) {
    const object = {
      n: { x: 0, y: +2 },
      s: { x: 0, y: -2 },
      ne: { x: +1, y: +1 },
      se: { x: +1, y: -1 },
      nw: { x: -1, y: +1 },
      sw: { x: -1, y: -1 },
    };
    return object[direction];
  }

  getOppositeDirection(direction) {
    const object = {
      n: 's',
      s: 'n',
      ne: 'sw',
      se: 'nw',
      nw: 'se',
      sw: 'ne',
    };
    return object[direction];
  }
}

const isEven = num => (num % 2) ? false : true;

module.exports = {
  HexesMaze
};