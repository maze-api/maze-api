const { HexesMaze } = require('./lib/maze-classes/HexesMaze');
const { SquaresMaze } = require('./lib/maze-classes/SquaresMaze');


// let options1 = {
//   width: 20,
//   height: 20,
//   startX: 1,
//   startY: 1,
//   cellShape: 'Squares',
//   algorithm: 'Woven'
// };
// let maze1 = new SquaresMaze(options1);
// console.log(maze1.exportMazeModel());
// console.log(maze1.printCells());


let options2 = {
  width: 20,
  height: 20,
  startX: 1,
  startY: 1,
  cellShape: 'Hexagonal',
  algorithm: 'Growing Tree'
};
let maze2 = new SquaresMaze(options2);
console.log('Algorithm', maze2.exportMazeModel().algorithm);
console.log('Connectivity Score', maze2.exportMazeModel().connectivity);
console.log('Average Path Length', maze2.exportMazeModel().averagePathLength);
console.log('Average Wrong Path Length', maze2.exportMazeModel().averageWrongPathLength);
console.log(maze2.printCells());


let options3 = {
  width: 20,
  height: 20,
  startX: 1,
  startY: 1,
  cellShape: 'Hexagonal',
  algorithm: 'Recursive Backtracker'
};
let maze3 = new SquaresMaze(options3);
console.log(maze3.exportMazeModel().algorithm);
console.log('Algorithm', maze3.exportMazeModel().algorithm);
console.log('Connectivity Score', maze3.exportMazeModel().connectivity);
console.log('Average Path Length', maze3.exportMazeModel().averagePathLength);
console.log('Average Wrong Path Length', maze3.exportMazeModel().averageWrongPathLength);
console.log(maze3.printCells());


let options4 = {
  width: 20,
  height: 20,
  startX: 1,
  startY: 1,
  cellShape: 'Hexagonal',
  algorithm: 'Prims'
};
let maze4 = new SquaresMaze(options4);
console.log('Algorithm', maze4.exportMazeModel().algorithm);
console.log('Connectivity Score', maze4.exportMazeModel().connectivity);
console.log('Average Path Length', maze4.exportMazeModel().averagePathLength);
console.log('Average Wrong Path Length', maze4.exportMazeModel().averageWrongPathLength);
console.log(maze4.printCells());


