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

    const url = req.url.split('?')[1].split('&');
    const query = url.reduce((acc, val) => {
      const entry = val.split('=');
      let key = entry[0];
      const value = entry[1];
      const keyOperator = key.split('_');

      if(keyOperator.length === 1) {
        acc[key] = value;
        return acc;
      }

      key = keyOperator[0];
      let operator = keyOperator[1];

      if(acc[key]) {
        const values = acc[key];
        values[`$${operator}`] = value;
        acc[key] = values;
        return acc;
      }

      const values = {};
      values[`$${operator}`] = value;
      acc[key] = values;
      return acc;

    }, {});



    console.log(query);


    // (
    //   { connectivity : 5,
    //     solutionLength: { $gt: 10, $lt: 100 } }
    // )  


    // let number = 10;
    // if(query.number) {
    //   number = query.number;
    //   delete query.number;
    // }


    Maze.find(query)
      .limit(10)
      .lean()
      .then(mazes => {
        console.log(mazes);
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