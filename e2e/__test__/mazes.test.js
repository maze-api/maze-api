const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');
const {
  validHexOptions,
  validSquareOptions,
  tooSmallDimensionsOptions,
  invalidStartPointOptions,
  duplicateStartAndEndOptions,
  invalidEndCoordOptions,
  invalidEndPointOptions,
  incompatibleAlgoAndCellShapeOptions,
  castErrorOptions
} = require('../../data/mazeOptions');

describe('Mazes', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('mazes'),
      db.dropCollection('users'),
      db.dropCollection('keys')
    ]);
  });

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

  it('can post a single valid maze', () => {
    return postMaze(validHexOptions).then(body => {
      expect(body).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          __v: 0,
          cellMap: expect.any(Array),
          start: expect.any(Object),
          end: expect.any(Object),
          solutionPath: expect.any(Array),
          connectivity: expect.any(Number),
          averagePathLength: expect.any(Number),
          solutionLength: expect.any(Number)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "algorithm": "Recursive Backtracker",
          "averagePathLength": Any<Number>,
          "cellMap": Any<Array>,
          "cellShape": "Hexagonal",
          "connectivity": Any<Number>,
          "dimensions": Object {
            "height": 3,
            "width": 3,
          },
          "end": Any<Object>,
          "solutionLength": Any<Number>,
          "solutionPath": Any<Array>,
          "start": Any<Object>,
        }
      `
      );
    });
  });

  it('gets a valid maze with default options if nothing is supplied', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send({})
      .expect(200);
  });

  it('returns a list of mazes', () => {
    const expectedDimensions = {
      height: 3,
      width: 3
    };

    return Promise.all([
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions)
    ]).then(() => {
      return request
        .get('/api/mazes')
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(3);
          expect(body[0].dimensions).toStrictEqual(expectedDimensions);
          expect(body[1].dimensions).toStrictEqual(expectedDimensions);
          expect(body[2].dimensions).toStrictEqual(expectedDimensions);
        });
    });
  });

  it('gets mazes from a query for "square" cellShapes', () => {
    return Promise.all([
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validSquareOptions),
      postMaze(validSquareOptions),
      postMaze(validSquareOptions),
      postMaze(validSquareOptions),
      postMaze(validSquareOptions),
      postMaze(validSquareOptions)
    ]).then(() => {
      return request
        .get(`/api/mazes?cellShape=Square`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body[0].cellShape).toBe('Square');
        });
    });
  });

  it('gets mazes from a query for solutionLength and connectivity', () => {
    return Promise.all([
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions)
    ]).then(() => {
      return request
        .get(`/api/mazes?solutionLength_lt=10&solutionLength_gt=1&connectivity_lt=1000`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body[0].solutionLength).toBeGreaterThan(1);
        });
    });
  });

  it('gets 10 mazes from a default query - even when there are more mazes in the DB', () => {
    return Promise.all([
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions)
    ]).then(() => {
      return request
        .get(`/api/mazes`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(10);
        });
    });
  });

  it('gets 5 mazes from a query with number="5"', () => {
    return Promise.all([
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions),
      postMaze(validHexOptions)
    ]).then(() => {
      return request
        .get(`/api/mazes?number=5`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(5);
        });
    });
  });

  it('gets a maze by id', () => {
    return postMaze(validHexOptions).then(savedMaze => {
      return request
        .get(`/api/mazes/${savedMaze._id}`)
        .set('Authorization', testUserKey)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              __v: 0,
              cellMap: expect.any(Array),
              start: expect.any(Object),
              end: expect.any(Object),
              solutionPath: expect.any(Array),
              connectivity: expect.any(Number),
              averagePathLength: expect.any(Number),
              solutionLength: expect.any(Number)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "algorithm": "Recursive Backtracker",
              "averagePathLength": Any<Number>,
              "cellMap": Any<Array>,
              "cellShape": "Hexagonal",
              "connectivity": Any<Number>,
              "dimensions": Object {
                "height": 3,
                "width": 3,
              },
              "end": Any<Object>,
              "solutionLength": Any<Number>,
              "solutionPath": Any<Array>,
              "start": Any<Object>,
            }
          `
          );
        });
    });
  });
  
  it('throws an error when the provided start coordinates are larger than maze dimensions', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send(invalidStartPointOptions)
      .expect(500)
      .then(({ error }) => {
        expect(error).toBeDefined();
      });
  });

  it('throws an error when the provided start and end coordinates are the same', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send(duplicateStartAndEndOptions)
      .expect(500)
      .then(({ error }) => {
        expect(error).toBeDefined();
      });
  });

  it('throws an error when the provided end coordinates are incomplete', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send(invalidEndCoordOptions)
      .expect(500)
      .then(({ error }) => {
        expect(error).toBeDefined();
      });
  });

  it('throws an error when given end coordinates larger than maze', () => {
    return request
      .post('/api/mazes') 
      .set('Authorization', testUserKey)
      .send(invalidEndPointOptions)
      .expect(500)
      .then(({ error }) => {
        expect(error).toBeDefined();
      });
  });

  it('throws an error when given a "cellShape" that is incompatible with the "algorithm"', () => {
    return request
      .post('/api/mazes') 
      .set('Authorization', testUserKey)
      .send(incompatibleAlgoAndCellShapeOptions)
      .expect(500)
      .then(({ error }) => {
        expect(error).toBeDefined();
      });
  });

  it('throws an error when the provided dimensions are too small', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send(tooSmallDimensionsOptions)
      .expect(400)
      .then(({ error }) => {
        expect(error).toBeDefined();
      });
  });

  it('throws an error when given options in wrong data format', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send(castErrorOptions)
      .expect(400)
      .then(({ error }) => {
        expect(error).toBeDefined();
      });
  });

});
