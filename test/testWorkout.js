import supertest from 'supertest';
import {app} from './../app.js';
import should from 'should';


describe('Workouts API unit test', function() {
this.timeout(120000);
it('should return collection of JSON documents', function(done) {
  supertest(app)
  .get('/api/workouts')
  .expect('Content-type', /json/)
  .expect(200)
  .end(function(err, res) {
      res.status.should.equal(200);
      done();
  });
});
});

// #2 add a workout
  it('should add a workout', function(done) {
    // post to /api/workouts
    this.timeout(1200000);
    supertest(app)
    .post('/api/workouts')
    .send({ workout_name: 'Jims Back Workout', trainer: 'Jimmy Cricket' , exercise_1: 'Wide Grip Pull Ups - 10x3' ,
    exercise_2: 'Deadlifts - 10x3' , exercise_3: 'Lat Pull Downs - 10x3' , exercise_4:'1 Arm Row - 10x3', difficulty: 'Beginner',
     time_in_minutes: '60', username: 'flynnboy', comments:[],  upvotes: '10'})
    .expect('Content-type', /json/)
    .expect(201)
    .end(function(err, res) {
      res.status.should.equal(201);
       res.body.should.have.property('_id');
       res.body.workout_name.should.equal('Jims Back Workout');
       done();
    });
  });

  // #3 delete a workout with authorization
  it('It should be able to delete a workout with authorization', function(done) {
    this.timeout(120000);
    const superserver = supertest(app);
    superserver
    .get('/api/workouts')
    .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImNvbm5vciIsImVtYWlsIjoiY29ubm9yZmx5bm40QGdtYWlsLmNvbSJ9LCJpYXQiOjE1MjQ5MTA0Nzd9.CsmEWp0Bb85ku8AIxK1hGSZ9GjWGMAefGUvYAe2aOpE')
    .expect('Content-type', /json/)
    .expect(200)
    .end(function(err, res) {
        const id = res.body[0]._id;
        superserver
            .delete('/api/workouts/'+id)
            .expect('Content-type', /json/)
            .expect(204) // This is HTTP response
            .end(function(err, res) {
              res.status.should.equal(204);
              done();
            });
           }
         );
});


  // update a workout
it('should update a workout', function(done) {
  this.timeout(120000);
    const superserver = supertest(app);
    superserver
    .get('/api/workouts')
    .expect('Content-type', /json/)
    .expect(200)
    .end(function(err, res) {
        const id = res.body[0]._id;
        superserver
  .put('/api/workouts/'+id)
  .send({difficulty:'Intermediate'})
  .expect('Content-type', /json/)
      .expect(200)
      .end(function(err, res) {
       res.status.should.equal(200);
       res.body.difficulty.should.equal('Intermediate');
       done();
     });
            }
          );
     });

  // #3 delete a workout without authorization
  it('It should not be able to delete a workout without authorization', function(done) {
    this.timeout(120000);
    const superserver = supertest(app);
    superserver
    .get('/api/workouts')
    .expect('Content-type', /json/)
    .expect(403)
    .end(function(err, res) {
        const id = res.body[0]._id;
        superserver
            .delete('/api/workouts/'+id)
            .expect('Content-type', /json/)
            .expect(403) // This is HTTP response
            .end(function(err, res) {
              res.status.should.equal(403);
              done();
            });
           }
         );



});
