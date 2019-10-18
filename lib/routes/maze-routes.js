const router = require('express').Router();
const Maze = require('../models/maze');
const queryParser = require('../middleware/query-parser');

router
  .post('/', (req, res, next) => {
    Maze.create(req.body)
      .then(maze => res.json(maze))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Maze.findById(req.params.id)
      .then(maze => res.json(maze))
      .catch(next);
  })

  .get('/', queryParser(), (req, res, next) => {
    const query = req.query;

    let number = 10;
    if(query.number) {
      number = Math.min(100, Math.floor(Number(query.number)));
      delete query.number;
    }

    Maze.find(query)
      .limit(number)
      .lean()
      .then(mazes => res.json(mazes))
      .catch(next);

  });



module.exports = router;
