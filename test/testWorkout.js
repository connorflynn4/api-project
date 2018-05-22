import supertest from 'supertest';
import {app} from './../app.js';
import should from 'should';
import {loadWorkouts} from './../workoutsData';

//Workout Unit Test
//JSON colection with auth
describe('Workouts API unit test', function() {
this.timeout(120000);
it('should return collection of JSON documents', function(done) {
  supertest(app)
  .get('/api/workouts')
  .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.Y29ubm9y.0ZtAOqXptUFcMQOohJokS-x1GGw0pJRotjnOjKZFlug')
  .expect('Content-type', /json/)
  .expect(200)
  .end(function(err, res) {
      res.status.should.equal(200);
      done();
});
});
});


// add a workout
 it('should add a workout', function(done) {
     this.timeout(1200000);
   supertest(app)
   .post('/api/workouts')
   .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.Y29ubm9y.0ZtAOqXptUFcMQOohJokS-x1GGw0pJRotjnOjKZFlug')
   .send({ workoutName: 'Jims Back Workout', trainer: 'Jimmy Cricket', exercise1: 'Wide Grip Pull Ups', exercise2: 'Deadlifts', difficulty: 'Beginner', timeInMins: 60})
   .expect('Content-type', /json/)
   .expect(201)
   .end(function(err, res) {
     res.status.should.equal(201);
     res.body.should.have.property('_id');
     res.body.workoutName.should.equal('Jims Back Workout');
     done();
   });
 });

/**
  // #3 delete a workout
     it('should delete workout', function(done) {
       const superserver = supertest(app);
       superserver
       .get('/api/workouts')
       .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.Y29ubm9y.0ZtAOqXptUFcMQOohJokS-x1GGw0pJRotjnOjKZFlug')
       .expect('Content-type', /json/)
       .expect(200)
       .expect('Content-type', /json/)
       .expect(200) // This is HTTP response
       .end(function(err, res) {
           const id = res.body[0]._id;
           superserver
               .delete('/api/workouts/'+id)
               .expect('Content-type', /json/)
               .expect(200)
               .expect(200) // This is HTTP response
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
    .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.Y29ubm9y.0ZtAOqXptUFcMQOohJokS-x1GGw0pJRotjnOjKZFlug')
    .expect('Content-type', /json/)
    .expect(200)
    .expect('Content-type', /json/)
    .expect(200)
    .end(function(err, res) {
        const id = res.body[0]._id;
        superserver
  .put('/api/workouts/'+id)
  .send({difficulty:'Intermediate'})
  .expect('Content-type', /json/)
      .expect(201)
      .end(function(err, res) {
       res.status.should.equal(201);
       res.body.difficulty.should.equal('Intermediate');
       done();
     });
            }
          );
     });

     **/
