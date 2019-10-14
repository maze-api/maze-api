
const validMazeOne = {
  topologyName: 'Rectangular',
  algorithm: 'Recursive Back Tracker',
  dimensions: { height: 2, width: 2 },
  difficulty: 'Easier',
  connectivity: 12,
  averagePathLength: 3,
  solutionLength: 12,
  start: { x: 1, y: 1 },
  end: { x: 4, y: 4 },
  solutionPath: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
  cellMap: [
    [
      {
        coordinates: { x: 1, y: 1 },
        exits: [{ x: 1, y: 2 }]
      },
      {
        coordinates: { x: 1, y: 2 },
        exits: [{ x: 1, y: 2 }]
      }
    ],
    [
      {
        coordinates: { x: 1, y: 3 },
        exits: [{ x: 1, y: 2 }]
      },
      {
        coordinates: { x: 1, y: 4 },
        exits: [{ x: 1, y: 2 }]
      }
    ]
  ]
};

const validMazeTwo = {
  topologyName: 'Triangular',
  algorithm: 'Recursive Back Tracker',
  dimensions: { height: 2, width: 2 },
  difficulty: 'Average',
  connectivity: 12,
  averagePathLength: 3,
  solutionLength: 12,
  start: { x: 1, y: 1 },
  end: { x: 4, y: 4 },
  solutionPath: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
  cellMap: [
    [
      {
        coordinates: { x: 1, y: 1 },
        exits: [{ x: 1, y: 2 }]
      },
      {
        coordinates: { x: 1, y: 2 },
        exits: [{ x: 1, y: 2 }]
      }
    ],
    [
      {
        coordinates: { x: 1, y: 3 },
        exits: [{ x: 1, y: 2 }]
      },
      {
        coordinates: { x: 1, y: 4 },
        exits: [{ x: 1, y: 2 }]
      }
    ]
  ]
};

const validMazeThree = {
  topologyName: 'Hexagonal',
  algorithm: 'Recursive Back Tracker',
  dimensions: { height: 2, width: 2 },
  difficulty: 'Harder',
  connectivity: 12,
  averagePathLength: 3,
  solutionLength: 12,
  start: { x: 1, y: 1 },
  end: { x: 4, y: 4 },
  solutionPath: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
  cellMap: [
    [
      {
        coordinates: { x: 1, y: 1 },
        exits: [{ x: 1, y: 2 }]

      },
      {
        coordinates: { x: 1, y: 2 },
        exits: [{ x: 1, y: 2 }]
      }
    ],
    [
      {
        coordinates: { x: 1, y: 3 },
        exits: [{ x: 1, y: 2 }]
      },
      {
        coordinates: { x: 1, y: 4 },
        exits: [{ x: 1, y: 2 }]
      }
    ]
  ]
};

module.exports = {
  validMazeOne,
  validMazeTwo,
  validMazeThree
}; 