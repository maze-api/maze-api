const router = require('express').Router();
const Maze = require('../models/maze');
// const generateMaze = require('../middleware/generate-maze');

router
  .post('/', (req, res, next) => {
    Maze.create(req.body.maze)
      .then(maze => {
        //generate maze
        res.json(maze);
      })
      .then({
        //put the maze
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

  })

  .get('/:id', (req, res, next) => {
    Maze.findById(req.params.id)
      .then(maze => {
        res.json(maze);
      })
      .catch(next);
  });

module.exports = router;