const { HexCell } = require('./Cell');

class HexMaze {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.makeCells();

    this.active = [];
    this.visited = [];
  }

  makeCells() {
    this.cells = [];
    
    for(let xIndex = 1; xIndex <= this.w; xIndex++) {
      this.cells[xIndex] = [];

      for(let yIndex = 1; yIndex <= 2 * this.h; yIndex += 2) {
        const y = isEven(xIndex) ? yIndex + 1 : yIndex;
        this.cells[xIndex][y] = new HexCell(xIndex, y);
      }
    }
  }

  getCell(x, y) {
    if(!this.cells[x] || !this.cells[x][y]) return null;

    return this.cells[x][y];
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