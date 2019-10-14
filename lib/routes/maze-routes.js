const router = require('express').Router();
const Maze = require('../models/maze');
const generateMaze = require('../middleware/generate-maze');

router
  .post('/', generateMaze(), (req, res, next) => {
    Maze.create(req.body)
      .then(maze => {
        res.json(maze);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const query = req.query;
    if(Object.keys(query).length > 0) {
      Maze.find(query)
        .lean()
        .then(mazes => {
          res.json(mazes);
        })
        .catch(next);

    } else {
      Maze.find()
        .lean()
        .then(mazes => {
          res.json(mazes);
        })
        .catch(next);

    }

  });

module.exports = router;