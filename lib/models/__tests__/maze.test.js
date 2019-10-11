const Maze = require('../maze');

describe('Maze Model', () => {
  it('Valid maze model', () => {
    const data = {
      topologyName: 'Rectangle',
      algorithm: 'Growing Tree',
      dimensions: { height: 4, width: 4 },
      difficulty: 'Beginner'
    };

    const maze = new Maze(data);
    expect(maze.validateSync()).toBeUndefined();

    expect(maze.toJSON()).toMatchInlineSnapshot(
      {
        _id: expect.any(Object)
      },
      `
      Object {
        "_id": Any<Object>,
        "algorithm": "Growing Tree",
        "difficulty": "Beginner",
        "dimensions": Object {
          "height": 4,
          "width": 4,
        },
        "end": Object {
          "x": Object {
            "required": true,
            "type": [Function],
          },
          "y": Object {
            "required": true,
            "type": [Function],
          },
        },
        "start": Object {
          "x": 0,
          "y": 0,
        },
        "topologyName": "Rectangle",
      }
    `
    );
  });
});
