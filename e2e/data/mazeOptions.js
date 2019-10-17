
const validHexOptions = {
  cellShape: 'Hexagonal',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
};
const validSquareOptions = {
  cellShape: 'Square',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
};
const invalidEndCoordOptions = {
  cellShape: 'Square',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
  end: { x: 1 }
};

const invalidEndPointOptions = {
  cellShape: 'Square',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
  end: { x: 1, y: 9 }
};

const castErrorOptions = {
  cellShape: 'Square',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: {}, y: 1 },
};

module.exports = {
  validHexOptions,
  validSquareOptions,
  invalidEndCoordOptions,
  invalidEndPointOptions,
  castErrorOptions
}; 