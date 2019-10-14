const Maze = require('../maze');

describe('Maze Model', () => {
  it('Valid maze model', () => {
    const data = {
      topologyName: 'Rectangular',
      algorithm: 'Recursive Back Tracker',
      dimensions: { height: 4, width: 4 },
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
            exits: { x: 1, y: 2 },
            overpass: false
          },
          {
            coordinates: { x: 2, y: 1 },
            exits: { x: 2, y: 2 },
            overpass: false
          }
        ],
        [
          {
            coordinates: { x: 1, y: 2 },
            exits: { x: 2, y: 2 },
            overpass: false
          },
          {
            coordinates: { x: 2, y: 2 },
            exits: { x: 1, y: 2 },
            overpass: false
          }
        ]
      ]
    };

    const maze = new Maze(data);
    expect(maze.validateSync()).toBeUndefined();
    expect(maze.toJSON()).toMatchInlineSnapshot(
      {
        _id: expect.any(Object),
        cellMap: expect.any(Array),
        dimensions: expect.any(Object),
        solutionPath: expect.any(Array)
      },
      `
      Object {
        "_id": Any<Object>,
        "algorithm": "Recursive Back Tracker",
        "averagePathLength": 3,
        "cellMap": Any<Array>,
        "connectivity": 12,
        "difficulty": "Easier",
        "dimensions": Any<Object>,
        "end": Object {
          "x": 4,
          "y": 4,
        },
        "solutionLength": 12,
        "solutionPath": Any<Array>,
        "start": Object {
          "x": 1,
          "y": 1,
        },
        "topologyName": "Rectangular",
      }
    `
    );
  });
});
