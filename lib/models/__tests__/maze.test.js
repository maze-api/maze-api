const Maze = require('../maze');

describe('Maze Model', () => {
  it('Valid maze model', () => {
    const data = {
      cellStructure: 'Square',
      algorithm: 'Recursive Backtracker',
      dimensions: { height: 4, width: 4 },
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
        "algorithm": "Recursive Backtracker",
        "averagePathLength": 3,
        "cellMap": Any<Array>,
        "cellShape": "Square",
        "connectivity": 12,
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
      }
    `
    );
  });
});
