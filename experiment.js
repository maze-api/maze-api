// const { HexesMaze } = require('./lib/maze-classes/HexesMaze');
const { SquaresMaze } = require('./lib/maze-classes/SquaresMaze');


let options1 = {
  width: 10,
  height: 10,
  startX: 1,
  startY: 1,
};
// options1.algorithm = 'Recursive Backtracker';
// options1.algorithm = 'Growing Tree';
// options1.algorithm = 'Prims';
options1.algorithm = 'Woven';
let maze1 = new SquaresMaze(options1);
// let maze1 = new HexesMaze(options1);
console.log(maze1.printCells());
console.log(maze1.printCells(true));

// let maze3 = new SquaresMaze(options1);
// // console.log(maze1.exportMazeModel());
// console.log(maze3.printCells());

// let maze2 = new HexesMaze(options1);
// // console.log(maze2.exportMazeModel());
// console.log(maze2.printCells());
