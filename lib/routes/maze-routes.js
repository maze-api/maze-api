const router = require('express').Router();
const Maze = require('../models/maze');
const generateMaze = require('../middleware/generate-maze');

router
  .post('/', generateMaze, (req, res, next) => {
    Maze.create(req.body)
      .then(maze => res.json(maze))
      .catch(next);
  });

  // .get('/', (req, res, next) => {
  //   Maze.find()
  //     .lean()
  //     .then(mazes => )
  // })

module.exports = router;