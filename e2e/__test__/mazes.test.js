const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');
const {
  validHexOptions,
  validSquareOptions
} = require('../../data/validMazeOptions');

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

  it('impossible to get an invalid maze', () => {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send({})
      .expect(200);
  });

  it('get mazes returns list of mazes', () => {
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

  it('get mazes with query for cellShape', () => {
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

  it.only('get mazes with query for solutionLength', () => {
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
          console.log(body);
          expect(body[0].solutionLength).toBeGreaterThan(1);
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
});
