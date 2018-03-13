import express from 'express';
import Workout  from './workoutModel';

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res) => {
  Workout.find((err, workouts) => {
    if (err) return handleError(res, err);
    return res.json(200, workouts);
  });
});

router.post('/', (req, res) => {
  Workout.create(req.body, function(err, workout) {
    if (err) return handleError(res, err);
    return res.json(201, workout);
  });
});

// Update a workout
router.put('/:id', (req, res) => {
  if (req.body._id) delete req.body._id;
  Workout.findById(req.params.id, (err, workout) => {
    if (err) return handleError(res, err);
    if (!workout) return res.send(404);
    const updated = _.merge(workout, req.body);
    updated.save((err) => {
      if (err) return handleError(res, err);
      return res.json(200, workout);
    });
  });
});

// Delete a contact
router.delete('/:id', (req, res) => {
  Workout.findById(req.params.id, (err, workout) => {
    if (err) return handleError(res, err);
    if (!workout) return res.send(404);
    workout.remove(function(err) {
      if (err) return handleError(res, err);
      return res.send(204);
    });
  });
});



function handleError(res, err) {
  return res.send(500, err);
};

export default router;