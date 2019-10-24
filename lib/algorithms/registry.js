const { recursiveBacktracker } = require('./recursive-backtracker');
const { growingTree } = require('./growing-tree');
const { prims } = require('./prims');
const { woven } = require('./woven');

module.exports = {
  Square: {
    'Recursive Backtracker': recursiveBacktracker,
    'Growing Tree': growingTree,
    'Prims': prims,
    'Woven': woven
  },
  Hexagonal: {
    'Recursive Backtracker': recursiveBacktracker,
    'Growing Tree': growingTree,
    'Prims': prims
  },
  All: {
    'Recursive Backtracker': recursiveBacktracker,
    'Growing Tree': growingTree,
    'Prims': prims,
    'Woven': woven
  }
};
