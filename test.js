const { HexMaze } = require('./lib/algorithms/hexagonalRecursiveBacktracker/Maze');
let maze;

maze = new HexMaze(4, 4);
console.log(maze.printCells());

maze = new HexMaze(5, 5);
console.log(maze.printCells());

maze = new HexMaze(6, 6);
console.log(maze.printCells());

maze = new HexMaze(10, 5);
console.log(maze.printCells());

maze = new HexMaze(20, 20);
console.log(maze.printCells());
