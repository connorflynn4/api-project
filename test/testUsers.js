import supertest from 'supertest';
import {app} from './../app.js';
import should from 'should'; // eslint-disable-line
// UNIT test begin
describe('Users API unit test', function() {
  this.timeout(120000); // eslint-disable-line
  //should return a list of JSON documents
  it('should return collection of JSON documents', function(done) {
    supertest(app)
    .get('/api/users')
    .expect('Content-type', /json/)
    .expect(200) // This is the HTTP response
    .end(function(err, res) {
        res.status.should.equal(200);
        done();
    });
  });

  //should register a user
  it('should register a user', function(done) {
    supertest(app)
    .post('/api/users')
    .query({action: 'register'})
    .send({username: 'jimmy', password: 'football'})
    .expect('Content-type', /json/)
    .expect(201)
    .end(function(err, res) {
      res.status.should.equal(201);
      res.body.success.should.equal(true);
      done();
    });
  });

  //shoud login a user
  it('should authenticate a user', function(done) {
    supertest(app)
    .post('/api/users')
    .send({username: 'connor', password: 'cat'})
    .expect('Content-type', /json/)
    .expect(201)
    .end(function(err, res) {
      res.status.should.equal(200);
      res.body.token.substring(0, 3).should.equal('JWT');
      done();
    });
  });
});
