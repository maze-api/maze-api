const router = require('express').Router();
const Maze = require('../models/maze  ');
const generateMaze = require('../middleware/generate-maze');

router
  .post('/', generateMaze(), (req, res, next) => {

    Maze.create();
  });