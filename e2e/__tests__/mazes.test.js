const request = require('../request');
const db = require('../db');

describe('Mazes', () => {

  const maze1 = {
    topologyName: 'Rectangle',
    algorithm: 'Recursive Back Tracker',
    dimensions: { height: 2, width: 2 },
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
        console.log(body);
      });
  });
});