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
      let number = 10;
      if(query.number) { number = query.number; }
      if(query.number === 'all') { number = 0; }
      if(query.number) { delete query.number; }
      Maze.find(query)
        .limit(number)
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