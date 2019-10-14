const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');
const { validMazeOne, validMazeTwo, validMazeThree } = require('../../data/validMazes');

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

  function postMaze(maze) {
    return request
      .post('/api/mazes')
      .set('Authorization', testUserKey)
      .send(maze)
      .expect(200)
      .then(({ body }) => {
        return body;
      });
  }

  it('can post a single valid maze', () => {
    return postMaze(validMazeOne)
      .then(body => {
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
      postMaze(validMazeThree),
    ])
      .then(() => {
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
      postMaze(validMazeThree),
    ])
      .then(() => {
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
      postMaze(validMazeThree),
    ])
      .then(() => {
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
      postMaze(validMazeThree),
    ])
      .then(() => {
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
      postMaze(validMazeThree),
    ])
      .then(() => {
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