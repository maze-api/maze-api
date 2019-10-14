const request = require('../request');
const db = require('../db');

describe('Mazes', () => {
  const maze1 = {
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

  //#region
  // const maze2 = {
  //   topologyName: 'Rectangle',
  //   algorithm: 'Recursive Back Tracker',
  //   dimensions: { height: 2, width: 2 },
  //   difficulty: 'Easier',
  //   connectivity: 12,
  //   averagePathLength: 3,
  //   solutionLength: 12,
  //   cellStructureKey: {
  //     coordinates: {
  //       x: 'a positive integer',
  //       y: 'a positive integer'
  //     },
  //     exits: 'A maximum of four and minimum of one coordinate sets.'
  //   },
  //   start: { x: 1, y: 1 },
  //   end: { x: 4, y: 4 },
  //   solution: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
  //   cellMap: [
  //     [
  //       {
  //         coordinates: { x: 1, y: 1 },
  //         exits: [{ x: 1, y: 2 }]
  //       },
  //       {
  //         coordinates: { x: 1, y: 2 },
  //         exits: [{ x: 1, y: 2 }]
  //       }
  //     ],
  //     [
  //       {
  //         coordinates: { x: 1, y: 3 },
  //         exits: [{ x: 1, y: 2 }]
  //       },
  //       {
  //         coordinates: { x: 1, y: 4 },
  //         exits: [{ x: 1, y: 2 }]
  //       }
  //     ]
  //   ]
  // };

  // const maze3 = {
  //   topologyName: 'Rectangle',
  //   algorithm: 'Recursive Back Tracker',
  //   dimensions: { height: 2, width: 2 },
  //   difficulty: 'Easier',
  //   connectivity: 12,
  //   averagePathLength: 3,
  //   solutionLength: 12,
  //   cellStructureKey: {
  //     coordinates: {
  //       x: 'a positive integer',
  //       y: 'a positive integer'
  //     },
  //     exits: 'A maximum of four and minimum of one coordinate sets.'
  //   },
  //   start: { x: 1, y: 1 },
  //   end: { x: 4, y: 4 },
  //   solution: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
  //   cellMap: [
  //     [
  //       {
  //         coordinates: { x: 1, y: 1 },
  //         exits: [{ x: 1, y: 2 }]

  //       },
  //       {
  //         coordinates: { x: 1, y: 2 },
  //         exits: [{ x: 1, y: 2 }]
  //       }
  //     ],
  //     [
  //       {
  //         coordinates: { x: 1, y: 3 },
  //         exits: [{ x: 1, y: 2 }]
  //       },
  //       {
  //         coordinates: { x: 1, y: 4 },
  //         exits: [{ x: 1, y: 2 }]
  //       }
  //     ]
  //   ]
  // };

  //#endregion

  beforeEach(() => {
    return db.dropCollection('mazes');
  });

  it('can post a single maze', () => {
    return request
      .post('/api/mazes')
      .send(maze1)
      .expect(200)
      .then(({ body }) => {
        expect(body.cellMap[0][0].coordinates).toEqual({ x: 1, y: 1 });
        expect(body.cellMap[0][1].coordinates).toEqual({ x: 1, y: 2 });
        expect(body.cellMap[1][0].coordinates).toEqual({ x: 1, y: 3 });
        expect(body.cellMap[1][1].coordinates).toEqual({ x: 1, y: 4 });
        expect(body.dimensions).toEqual({ height: 2, width: 2 });
        expect(body.start).toEqual({ x: 1, y: 1 });
        expect(body.end).toEqual({ x: 4, y: 4 });
        expect(body.solutionPath[0]).toEqual({
          _id: expect.any(String),
          x: 1,
          y: 1
        });
        expect(body.solutionPath[1]).toEqual({
          _id: expect.any(String),
          x: 1,
          y: 2
        });
        expect(body).toMatchInlineSnapshot(
          {
            ...maze1,
            _id: expect.any(String),
            __v: 0,
            cellMap: expect.any(Array),
            start: expect.any(Object),
            end: expect.any(Object),
            solutionPath: expect.any(Array)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "algorithm": "Recursive Back Tracker",
            "averagePathLength": 3,
            "cellMap": Any<Array>,
            "connectivity": 12,
            "difficulty": "Easier",
            "dimensions": Object {
              "height": 2,
              "width": 2,
            },
            "end": Any<Object>,
            "solutionLength": 12,
            "solutionPath": Any<Array>,
            "start": Any<Object>,
            "topologyName": "Rectangular",
          }
        `
        );
      });
  });
});
