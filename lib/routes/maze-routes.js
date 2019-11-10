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

    const convertToNumber = (obj, key) => {
      if(obj[key]) obj[key] = Number(obj[key]);
    };
    convertToNumber(query, 'dimensions.width');
    convertToNumber(query, 'dimensions.height');
    if(query.solutionLength) convertToNumber(query.solutionLength, '$lt');
    if(query.solutionLength) convertToNumber(query.solutionLength, '$gt');
    if(query.connectivity) convertToNumber(query.connectivity, '$lt');
    if(query.connectivity) convertToNumber(query.connectivity, '$gt');
    
    Maze.aggregate([
      { $match: query },
      { $sample: { size: number } }
    ])
      .then(mazes => res.json(mazes))
      .catch(next);

  });



module.exports = router;
