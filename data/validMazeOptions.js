
const validHexOptions = {
  topologyName: 'Hexagonal',
  dimensions: { height: 3, width: 3 },
  difficulty: 'Easier',
  start: { x: 1, y: 1 },
};

const validHexOptions2 = {
  topologyName: 'Hexagonal',
  algorithm: 'Recursive Back Tracker',
  dimensions: { height: 4, width: 6 },
  difficulty: 'Harder',
  start: { x: 1, y: 1 },
};

module.exports = {
  validHexOptions,
  validHexOptions2,
}; 