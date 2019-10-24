const mongoose = require('mongoose')
const Maze = require('./maze');

const schema = new mongoose.Schema({

});

schema.post('validate', function () {
  const { width, height } = this.dimensions
  this.cells = [];

  for (let xIndex = 1; xIndex <= width; xIndex++) {
    this.cells[xIndex] = [];

    for (let yIndex = 1; yIndex <=
      height; yIndex += 2) {
      const y = isEven(xIndex) ? yIndex + 1 : yIndex;
      this.cells[xIndex][y] = new HexCell(xIndex, y);
    }
  }
})

module.exports = Maze.discriminator('Hexagonal', schema);
