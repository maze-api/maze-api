const { HexesMaze } = require('./lib/maze-classes/HexesMaze');
const { SquaresMaze } = require('./lib/maze-classes/SquaresMaze');

// maze = new HexMaze(30, 20);
// maze.calculateDifficultiesFromStartingPoint(1, 1);
// const longestMaxXEdgeCellSolution = maze.cells[maze.maxX].reduce((distObj, cell) => {
//   const newObj = { distance: cell.distanceFromStart, x: cell.x, y: cell.y };
//   return (newObj.distance > distObj.distance) ? newObj : distObj;
// }, { distance: 0, x: -1, y: -1 });
// console.log('starting coords: (1, 1)');
// console.log(`longest right-edge solution distance: ${longestMaxXEdgeCellSolution.distance} at (${longestMaxXEdgeCellSolution.x}, ${longestMaxXEdgeCellSolution.y})`);
// console.log('leaf cell count:', maze.numLeafCells);
// console.log('average distance of non-solution trails:', (maze.numCells - longestMaxXEdgeCellSolution.distance) / maze.numLeafCells);
// console.log('average distance of all trails:', maze.numCells / maze.numLeafCells);

// console.log(maze.printCells());

// console.log(maze.solutionPathFromEndCoords(longestMaxXEdgeCellSolution.x, longestMaxXEdgeCellSolution.y));
const options = {
  width: 20,
  height: 20,
  startX: 1,
  startY: 1,
  endX: 15,
  endY: 17,
  cellShape: 'Hexagon',
  algorithm: 'Recursive Backtracker'
};

const maze = new HexesMaze(options);
console.log(maze.printCells());
console.log(maze.exportMazeModel());

const maze2 = new SquaresMaze(options);
console.log(maze2.printCells());
console.log(maze2.exportMazeModel());


// maze = new HexMaze(8, 8);
// console.log(maze.printCells());
// maze = new HexMaze(9, 9);
// console.log(maze.printCells());

// maze = new HexMaze(20, 20);
// console.log(maze.printCells());

// maze = new HexMaze(40, 40);
// console.log(maze.printCells());
