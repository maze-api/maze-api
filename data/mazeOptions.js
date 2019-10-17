
const validHexOptions = {
  cellShape: 'Hexagonal',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
};

const validSquareOptions = {
  cellShape: 'Square',
  algorithm: 'Prims',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
};
const validSquareOptions2 = {
  cellShape: 'Square',
  algorithm: 'Woven',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
};

const tooSmallDimensionsOptions = {
  cellShape: 'Square',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 1, width: 1 },
  start: { x: 1, y: 1 },
  end: { x: 1, y: 1 }
};

const invalidStartPointOptions = {
  cellShape: 'Square',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: 4, y: 11 },
  end: { x: 1, y: 3 }
};

const duplicateStartAndEndOptions = {
  cellShape: 'Square',
  algorithm: 'Recursive Backtracker',
  dimensions: { height: 3, width: 3 },
  start: { x: 2, y: 2 },
  end: { x: 2, y: 2 }
};

const invalidEndCoordOptions = {
  cellShape: 'Square',
  algorithm: 'Woven',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
  end: { x: 1 }
};  

const invalidEndPointOptions = {
  cellShape: 'Square',
  algorithm: 'Growing Tree',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
  end: { x: 1, y: 9 }
};  

const incompatibleAlgoAndCellShapeOptions = {
  cellShape: 'Hexagonal',
  algorithm: 'Woven',
  dimensions: { height: 3, width: 3 },
  start: { x: 1, y: 1 },
  end: { x: 1, y: 1 }
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
  validSquareOptions2,
  tooSmallDimensionsOptions,
  invalidStartPointOptions,
  duplicateStartAndEndOptions,
  invalidEndCoordOptions,
  invalidEndPointOptions,
  incompatibleAlgoAndCellShapeOptions,
  castErrorOptions
}; 