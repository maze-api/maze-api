const router = require('express').Router();
const Maze = require('../models/maze');
// const generateMaze = require('../middleware/generate-maze');

router
  .post('/', (req, res, next) => {
    Maze.create(req.body)
      .then(maze => res.json(maze))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    //gt, lt, gte, lte, 
    //operators will default as false
    //if those exist, we need to destructure query, 
    //and interpret
  
    const query = {
      ...req.query
    };
    console.log(query);


    let number = 10;
    if(query.number) { 
      number = query.number;
      delete query.number; 
    }

    
    Maze.find(query)
      .limit(number)
      .lean()
      .then(mazes => {
        res.json(mazes);
      })
      .catch(next);
  })


  .get('/:id', (req, res, next) => {
    Maze.findById(req.params.id)
      .then(maze => {
        res.json(maze);
      })
      .catch(next);
  });

module.exports = router;