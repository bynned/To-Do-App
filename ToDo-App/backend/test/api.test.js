const request = require('supertest');
const app = require('../src/app');
const assert = require('assert');

describe('GET /api/v1/tasks', () => {
  it('Should return all the todos', (done) => {
    request(app)
      .get('/api/v1/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,
        [
          {
            "userId": 1,
            "id": 1,
            "title": "Eat bing chilling",
            "completed": false
          },
          {
            "userId": 1,
            "id": 2,
            "title": "Eat pyttipannu",
            "completed": false
          },
          {
            "userId": 1,
            "id": 3,
            "title": "Sleep",
            "completed": false
          }
        ], done);
  });
});

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});

/*---------------3 More tests-------------------*/

describe('GET /api/v1/tasks/:id', () => {
  it('Should return a todo from id', (done) => {
    request(app)
      .get('/api/v1/tasks/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,

          {
            "userId": 1,
            "id": 1,
            "title": "Eat bing chilling",
            "completed": false
          }
        , done);
  });
});

describe('DELETE /:id', () => {
  it('Should delete a todo by id', (done) => {
    request(app)
    .delete('/api/v1/tasks/2')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      assert.equal(res.body.message, 'Deleted');
      done();
    });
  });
});

describe('PATCH /:id', () => {
  it('Should update a todo by id', (done) => {
    request(app)
    .patch('/api/v1/tasks/3')
    .send({completed: true})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      assert.equal(res.body.message, 'Updated');
      done();
    });
  });
});
