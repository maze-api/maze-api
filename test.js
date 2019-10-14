const { HexMaze } = require('./lib/algorithms/hexagonalRecursiveBacktracker/Maze');
let maze;

maze = new HexMaze(5, 5);
maze.calculateDifficultiesFromStartingPoint(1, 5);

console.log(maze.printCells());
console.log('leaf cell count:', maze.numLeafCells);
console.log('starting coords: (1, 5) \n');
maze.traverseCells(cell => console.log(cell.x, cell.y, ': ', cell.distanceFromStart));

// maze = new HexMaze(8, 8);
// console.log(maze.printCells());
// maze = new HexMaze(9, 9);
// console.log(maze.printCells());

// maze = new HexMaze(20, 20);
// console.log(maze.printCells());

// maze = new HexMaze(40, 40);
// console.log(maze.printCells());
