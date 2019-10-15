
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

  }
  
}

module.exports = {
  RectangularMaze
};