const Maze = require('../maze');

describe('Maze Model', () => {
  it('Valid maze model', () => {
    const data = {
      topologyName: 'Rectangle',
      algorithm: 'Recursive Back Tracker',
      dimensions: { height: 4, width: 4 },
      difficulty: 'Beginner',
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
      sides: [],
      graph: [
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

    expect(maze.toJSON()).toMatchInlineSnapshot(
      {
        _id: expect.any(Object),
        solution: [
          {
            _id: expect.any(Object)
          },
          {
            _id: expect.any(Object)
          }
        ],
        graph: [
          [
            {
              _id: expect.any(Object),
              exits: [
                {
                  _id: expect.any(Object)
                }
              ]
            },
            {
              _id: expect.any(Object),
              exits: [
                {
                  _id: expect.any(Object)
                }
              ]
            }
          ],
          [
            {
              _id: expect.any(Object),
              exits: [
                {
                  _id: expect.any(Object)
                }
              ]
            },
            {
              _id: expect.any(Object),
              exits: [
                {
                  _id: expect.any(Object)
                }
              ]
            }
          ]
        ]
      },
      `
      Object {
        "_id": Any<Object>,
        "algorithm": "Recursive Back Tracker",
        "cellStructureKey": Object {
          "coordinates": Object {
            "x": "a positive integer",
            "y": "a positive integer",
          },
        },
        "difficulty": "Beginner",
        "dimensions": Object {
          "height": 4,
          "width": 4,
        },
        "end": Object {
          "x": 4,
          "y": 4,
        },
        "graph": Array [
          Array [
            Object {
              "_id": Any<Object>,
              "coordinates": Object {
                "x": 1,
                "y": 1,
              },
              "exits": Array [
                Object {
                  "_id": Any<Object>,
                  "x": 1,
                  "y": 2,
                },
              ],
            },
            Object {
              "_id": Any<Object>,
              "coordinates": Object {
                "x": 1,
                "y": 2,
              },
              "exits": Array [
                Object {
                  "_id": Any<Object>,
                  "x": 1,
                  "y": 2,
                },
              ],
            },
          ],
          Array [
            Object {
              "_id": Any<Object>,
              "coordinates": Object {
                "x": 1,
                "y": 3,
              },
              "exits": Array [
                Object {
                  "_id": Any<Object>,
                  "x": 1,
                  "y": 2,
                },
              ],
            },
            Object {
              "_id": Any<Object>,
              "coordinates": Object {
                "x": 1,
                "y": 4,
              },
              "exits": Array [
                Object {
                  "_id": Any<Object>,
                  "x": 1,
                  "y": 2,
                },
              ],
            },
          ],
        ],
        "solution": Array [
          Object {
            "_id": Any<Object>,
            "x": 1,
            "y": 1,
          },
          Object {
            "_id": Any<Object>,
            "x": 1,
            "y": 2,
          },
        ],
        "start": Object {
          "x": 1,
          "y": 1,
        },
        "topologyName": "Rectangle",
      }
    `
    );
  });
});
