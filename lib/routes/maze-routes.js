const router = require('express').Router();
const Maze = require('../models/maze');
const generateMaze = require('../middleware/generate-maze');

router
  .post('/', generateMaze, (req, res, next) => {
    Maze.create(req.body)
      .then(maze => res.json(maze))
      .catch(next);
  });

//  .get('/', ({ query }, res, next) => {
//    const findQuery = {};
//    findQuery.dimensions = {
//      height: query.height || 2,
//      width: query.width || 2
//    };
//    if (query.algorithm) { findQuery.algorithm = query.algorithm; }
//    if (query.difficulty) { findQuery.difficulty = query.difficulty; }
//    // query.size ? findQuery.size = query.size : findQuery.size = [10, 10];
//    query.number ? findQuery.number = query.number : findQuery.number = 3;
//    query.topography ? findQuery.topography = query.topography : findQuery.topography = 'Rectangular';

//    Maze.find(findQuery)
//      .lean()
//      .then(mazes => {
//        res.json(mazes);
//      })
//      .catch(next);
//  });

module.exports = router;