const { HexesMaze } = require('./lib/maze-classes/HexesMaze');
const { SquaresMaze } = require('./lib/maze-classes/SquaresMaze');

const options = {
  width: 20,
  height: 20,
  startX: 1,
  startY: 1,
  endX: 15,
  endY: 17,
  cellShape: 'Hexagon',
};
// options.algorithm = 'Recursive Backtracker';
options.algorithm = 'Woven';

// const maze = new HexesMaze(options);
// console.log(maze.printCells());

const maze2 = new SquaresMaze(options);
const showSolution = 1;
console.log(maze2.printCells(showSolution));
