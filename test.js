const { HexMaze } = require('./lib/algorithms/hexagonalRecursiveBacktracker/Maze');
let maze;

maze = new HexMaze(8, 8);
maze.calculateDifficultiesFromStartingPoint(1, 1);
const longestMaxXEdgeCellSolution = maze.cells[maze.maxX].reduce((distObj, cell) => {
  const newObj = { distance: cell.distanceFromStart, coord: `(${cell.x}, ${cell.y})` };
  return (newObj.distance > distObj.distance) ? newObj : distObj;
}, { distance: 0, coord: '0, 0' });
console.log('starting coords: (1, 1)');
console.log('longest right-edge solution distance:', longestMaxXEdgeCellSolution.distance, longestMaxXEdgeCellSolution.coord);
console.log('leaf cell count:', maze.numLeafCells);
console.log('average distance of non-solution trails:', (maze.numCells - longestMaxXEdgeCellSolution.distance) / maze.numLeafCells);
console.log(maze.printCells());
// maze.traverseCells(cell => console.log(cell.x, cell.y, ': ', cell.distanceFromStart));

// maze = new HexMaze(8, 8);
// console.log(maze.printCells());
// maze = new HexMaze(9, 9);
// console.log(maze.printCells());

// maze = new HexMaze(20, 20);
// console.log(maze.printCells());

// maze = new HexMaze(40, 40);
// console.log(maze.printCells());
