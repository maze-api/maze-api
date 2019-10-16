const { HexesMaze } = require('./lib/maze-classes/HexesMaze');
const { SquaresMaze } = require('./lib/maze-classes/SquaresMaze');
let options;


options = {
  width: 10,
  height: 10,
  startX: 1,
  startY: 1,
};
options.algorithm = 'Recursive Backtracker';
options.algorithm = 'Woven';
// options.endX = 5;
// options.endY = 7;
const squaresMaze = new SquaresMaze(options);
// console.log(squaresMaze.exportMazeModel().averageWrongPathLength);
// console.log(squaresMaze.exportMazeModel().averagePathLength);
// console.log(squaresMaze.exportMazeModel().solutionLength);
console.log(squaresMaze.printCells());


options = {
  width: 11,
  height: 10,
  startX: 1,
  startY: 1,
};
options.algorithm = 'Recursive Backtracker';
// options.endX = 10;
// options.endY = 2;
const hexesMaze = new HexesMaze(options);
// console.log(hexesMaze.exportMazeModel().averagePathLength);
// console.log(hexesMaze.exportMazeModel().averageWrongPathLength);
// console.log(hexesMaze.exportMazeModel().solutionLength);
console.log(hexesMaze.printCells());

