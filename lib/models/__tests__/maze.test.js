const Maze = require('../maze');

describe('Maze Model', () => {
  it('Valid maze model', () => {
    const data = {
      topologyName: 'Rectangle',
      algorithm: 'Recursive Back Tracker',
      dimensions: { height: 4, width: 4 },
      difficulty: 'Easier',
      connectivity: 12,
      averagePathLength: 3,
      solutionLength: 12,
      cellStructureKey: {
        coordinates: {
          x: 'a positive integer',
          y: 'a positive integer'
        },
        exits: 'A maximum of four and minimum of one coordinate sets.'
      },
      start: { x: 1, y: 1 },
      end: { x: 4, y: 4 },
      solution: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
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

    const maze = new Maze(data);
    expect(maze.validateSync()).toBeUndefined();

    expect(maze.toJSON()).toMatchInlineSnapshot(`
      Object {
        "_id": "5da10228af6a87314efeed02",
        "algorithm": "Recursive Back Tracker",
        "averagePathLength": 3,
        "cellMap": Array [
          Array [
            Object {
              "_id": "5da10228af6a87314efeed05",
              "coordinates": Object {
                "x": 1,
                "y": 1,
              },
              "exits": Array [
                Object {
                  "_id": "5da10228af6a87314efeed06",
                  "x": 1,
                  "y": 2,
                },
              ],
            },
            Object {
              "_id": "5da10228af6a87314efeed03",
              "coordinates": Object {
                "x": 1,
                "y": 2,
              },
              "exits": Array [
                Object {
                  "_id": "5da10228af6a87314efeed04",
                  "x": 1,
                  "y": 2,
                },
              ],
            },
          ],
          Array [
            Object {
              "_id": "5da10228af6a87314efeed09",
              "coordinates": Object {
                "x": 1,
                "y": 3,
              },
              "exits": Array [
                Object {
                  "_id": "5da10228af6a87314efeed0a",
                  "x": 1,
                  "y": 2,
                },
              ],
            },
            Object {
              "_id": "5da10228af6a87314efeed07",
              "coordinates": Object {
                "x": 1,
                "y": 4,
              },
              "exits": Array [
                Object {
                  "_id": "5da10228af6a87314efeed08",
                  "x": 1,
                  "y": 2,
                },
              ],
            },
          ],
        ],
        "cellStructureKey": Object {
          "coordinates": Object {
            "x": "a positive integer",
            "y": "a positive integer",
          },
          "exits": "A maximum of four and minimum of one coordinate sets.",
        },
        "connectivity": 12,
        "difficulty": "Easier",
        "dimensions": Object {
          "height": 4,
          "width": 4,
        },
        "end": Object {
          "x": 4,
          "y": 4,
        },
        "solutionLength": 12,
        "solutionPath": Array [],
        "start": Object {
          "x": 1,
          "y": 1,
        },
        "topologyName": "Rectangle",
      }
    `);
  });
});
