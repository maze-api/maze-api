const { HexMaze } = require('./lib/algorithms/hexagonalRecursiveBacktracker/Maze');
let maze;

// maze = new HexMaze(3, 3);
// console.log(maze.printCells());

maze = new HexMaze(8, 8);
console.log(maze.printCells());
maze = new HexMaze(9, 9);
console.log(maze.printCells());

maze = new HexMaze(20, 20);
console.log(maze.printCells());

// maze = new HexMaze(40, 40);
// console.log(maze.printCells());
