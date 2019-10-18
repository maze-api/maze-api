// const HexMaze = require('../algorithms/hexagonalRecursiveBacktracker/Maze');

// //Pre Algo Step

// //Algo
// // const hexMaze = new HexMaze(data.width, data.height, data.startX, data.startY);
// //Post Algo Difficulty Analysis

// //Populate Document

// // const maze = {
// //   topologyName: 'Rectangular',
// //   algorithm: 'Recursive Back Tracker',
// //   dimensions: { height: 4, width: 4 },
// //   difficulty: 'Easier',
// //   connectivity: 12,
// //   averagePathLength: 3,
// //   solutionLength: 12,
// //   start: { x: 1, y: 1 },
// //   end: { x: 4, y: 4 },
// //   solutionPath: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
// //   cellMap: [
// //     [
// //       {
// //         coordinates: { x: 1, y: 1 },
// //         exits: { x: 1, y: 2 },
// //         overpass: false
// //       },
// //       {
// //         coordinates: { x: 2, y: 1 },
// //         exits: { x: 2, y: 2 },
// //         overpass: false
// //       }
// //     ],
// //     [
// //       {
// //         coordinates: { x: 1, y: 2 },
// //         exits: { x: 2, y: 2 },
// //         overpass: false
// //       },
// //       {
// //         coordinates: { x: 2, y: 2 },
// //         exits: { x: 1, y: 2 },
// //         overpass: false
// //       }
// //     ]
// //   ]
// // };


// module.exports = () => ({ body }, res, next) => {
//   const data = {
//     width: body.options.width || 10,
//     height: body.options.height || 10,
//     startX: body.options.startX || 1,
//     startY: body.options.startY || 1,
//     difficulty: body.options.difficulty || 'harder',

//   };
//   const hexMaze = new HexMaze(data.width, data.height, data.startX, data.startY, data.difficulty);

//   res.body.maze = hexMaze;

//   next();
// };