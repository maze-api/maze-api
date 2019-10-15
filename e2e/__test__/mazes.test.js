const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');
const {
  validMazeOne,
  validMazeTwo,
  validMazeThree
} = require('../../data/validMazes');
const { validHexOptions } = require('../../data/validMazeOptions');

describe('Mazes', () => {
  const testUser = {
    email: 'me@me.com',
    password: 'abc'
  };

  let testUserKey;

  beforeEach(() => {
    return signupUser(testUser).then(user => {
      testUserKey = user.key;
    });
  });

  beforeEach(() => {
    return Promise.all([
      db.dropCollection('mazes'),
      db.dropCollection('users'),
      db.dropCollection('keys')
    ]);
  });

  function postMaze(options) {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send(options)
      .expect(200)
      .then(({ body }) => {
        return body;
      });
  }

  it.only('can post a single valid maze', () => {
    return postMaze(validHexOptions).then(body => {
      expect(body).toMatchInlineSnapshot(`
        Object {
          "__v": 0,
          "_id": "5da605b47bffa56b248057af",
          "algorithm": "Recursive Back Tracker",
          "averagePathLength": 4.5,
          "cellMap": Array [
            Array [
              Object {
                "_id": "5da605b47bffa56b248057b5",
                "coordinates": Object {
                  "x": 1,
                  "y": 1,
                },
                "exits": Object {
                  "ne": Object {
                    "x": 2,
                    "y": 2,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057b6",
                "coordinates": Object {
                  "x": 1,
                  "y": 3,
                },
                "exits": Object {
                  "n": Object {
                    "x": 1,
                    "y": 5,
                  },
                  "ne": Object {
                    "x": 2,
                    "y": 4,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057b7",
                "coordinates": Object {
                  "x": 1,
                  "y": 5,
                },
                "exits": Object {
                  "s": Object {
                    "x": 1,
                    "y": 3,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057b8",
                "coordinates": Object {
                  "x": 2,
                  "y": 2,
                },
                "exits": Object {
                  "se": Object {
                    "x": 3,
                    "y": 1,
                  },
                  "sw": Object {
                    "x": 1,
                    "y": 1,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057b9",
                "coordinates": Object {
                  "x": 2,
                  "y": 4,
                },
                "exits": Object {
                  "ne": Object {
                    "x": 3,
                    "y": 5,
                  },
                  "sw": Object {
                    "x": 1,
                    "y": 3,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057ba",
                "coordinates": Object {
                  "x": 2,
                  "y": 6,
                },
                "exits": Object {
                  "se": Object {
                    "x": 3,
                    "y": 5,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057bb",
                "coordinates": Object {
                  "x": 3,
                  "y": 1,
                },
                "exits": Object {
                  "n": Object {
                    "x": 3,
                    "y": 3,
                  },
                  "nw": Object {
                    "x": 2,
                    "y": 2,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057bc",
                "coordinates": Object {
                  "x": 3,
                  "y": 3,
                },
                "exits": Object {
                  "n": Object {
                    "x": 3,
                    "y": 5,
                  },
                  "s": Object {
                    "x": 3,
                    "y": 1,
                  },
                },
                "overpass": false,
              },
            ],
            Array [
              Object {
                "_id": "5da605b47bffa56b248057bd",
                "coordinates": Object {
                  "x": 3,
                  "y": 5,
                },
                "exits": Object {
                  "nw": Object {
                    "x": 2,
                    "y": 6,
                  },
                  "s": Object {
                    "x": 3,
                    "y": 3,
                  },
                  "sw": Object {
                    "x": 2,
                    "y": 4,
                  },
                },
                "overpass": false,
              },
            ],
          ],
          "connectivity": 0.2222222222222222,
          "difficulty": "Harder",
          "dimensions": Object {
            "height": 3,
            "width": 3,
          },
          "end": Object {
            "x": 3,
            "y": 5,
          },
          "solutionLength": 5,
          "solutionPath": Array [
            Object {
              "_id": "5da605b47bffa56b248057b4",
              "x": 1,
              "y": 1,
            },
            Object {
              "_id": "5da605b47bffa56b248057b3",
              "x": 2,
              "y": 2,
            },
            Object {
              "_id": "5da605b47bffa56b248057b2",
              "x": 3,
              "y": 1,
            },
            Object {
              "_id": "5da605b47bffa56b248057b1",
              "x": 3,
              "y": 3,
            },
            Object {
              "_id": "5da605b47bffa56b248057b0",
              "x": 3,
              "y": 5,
            },
          ],
          "start": Object {
            "x": 1,
            "y": 1,
          },
          "topologyName": "Hexagonal",
        }
      `);
    });
  });

  it('errors on invalid maze input', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send({})
      .expect(400);
  });

  it('get mazes returns list of mazes', () => {
    return Promise.all([
      postMaze(validMazeOne),
      postMaze(validMazeTwo),
      postMaze(validMazeThree)
    ]).then(() => {
      return request
        .get('/api/mazes')
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(3);
          expect(body[0].difficulty).toBe('Easier');
          expect(body[1].difficulty).toBe('Average');
          expect(body[2].difficulty).toBe('Harder');
        });
    });
  });

  it('get mazes with query for topologyName', () => {
    return Promise.all([
      postMaze(validMazeOne),
      postMaze(validMazeTwo),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree)
    ]).then(() => {
      return request
        .get(`/api/mazes?topologyName=Rectangular`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body[0].topologyName).toBe('Rectangular');
        });
    });
  });

  it('get mazes with query for difficulty', () => {
    return Promise.all([
      postMaze(validMazeOne),
      postMaze(validMazeTwo),
      postMaze(validMazeThree)
    ]).then(() => {
      return request
        .get(`/api/mazes?difficulty=Average`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body[0].difficulty).toBe('Average');
        });
    });
  });

  it('get mazes with two queries', () => {
    return Promise.all([
      postMaze(validMazeOne),
      postMaze(validMazeTwo),
      postMaze(validMazeThree)
    ]).then(() => {
      return request
        .get(`/api/mazes?difficulty=Average&topologyName=Triangular`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body[0].difficulty).toBe('Average');
          expect(body[0].topologyName).toBe('Triangular');
        });
    });
  });

  it('get 10 mazes with query', () => {
    return Promise.all([
      postMaze(validMazeOne),
      postMaze(validMazeTwo),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree),
      postMaze(validMazeThree)
    ]).then(() => {
      return request
        .get(`/api/mazes?difficulty=Harder&topologyName=Hexagonal`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(10);
          expect(body[0].difficulty).toBe('Harder');
          expect(body[0].topologyName).toBe('Hexagonal');
          expect(body[1].difficulty).toBe('Harder');
          expect(body[1].topologyName).toBe('Hexagonal');
          expect(body[2].difficulty).toBe('Harder');
          expect(body[2].topologyName).toBe('Hexagonal');
          expect(body[3].difficulty).toBe('Harder');
          expect(body[3].topologyName).toBe('Hexagonal');
          expect(body[4].difficulty).toBe('Harder');
          expect(body[4].topologyName).toBe('Hexagonal');
          expect(body[5].difficulty).toBe('Harder');
          expect(body[5].topologyName).toBe('Hexagonal');
          expect(body[6].difficulty).toBe('Harder');
          expect(body[6].topologyName).toBe('Hexagonal');
          expect(body[7].difficulty).toBe('Harder');
          expect(body[7].topologyName).toBe('Hexagonal');
          expect(body[8].difficulty).toBe('Harder');
          expect(body[8].topologyName).toBe('Hexagonal');
          expect(body[9].difficulty).toBe('Harder');
          expect(body[9].topologyName).toBe('Hexagonal');
        });
    });
  });

  it('gets a maze by id', () => {
    return postMaze(validMazeOne).then(savedMaze => {
      return request
        .get(`/api/mazes/${savedMaze._id}`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              ...validMazeOne,
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
});
