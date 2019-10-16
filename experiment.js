const { HexesMaze } = require('./lib/maze-classes/HexesMaze');
const { SquaresMaze } = require('./lib/maze-classes/SquaresMaze');

const options = {
  width: 10,
  height: 10,
  startX: 1,
  startY: 1,
  endX: 5,
  endY: 7,
};

let maze;

// options.algorithm = 'Recursive Backtracker';
options.algorithm = 'Woven';
maze = new SquaresMaze(options);
console.log(maze.exportMazeModel().averagePathLength);
console.log(maze.exportMazeModel().averageWrongPathLength);
console.log(maze.exportMazeModel().solutionLength);
console.log(maze.printCells());

options.algorithm = 'Recursive Backtracker';
maze = new HexesMaze(options);
//console.log(maze.printCells());

