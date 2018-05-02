import express from 'express';
import Workout  from './workoutModel';
import multer from 'multer';
import _ from 'lodash';
const router = express.Router();
var workoutEvent = require("../../events.js")
import asyncHandler from 'express-async-handler';
import UserModel from './../users/userModel';


const upload = multer ({dest: './uploads'});   //where multer will store incoming files
const storage = multer.diskStorage({   //adjust how the files get stored
destination: function(req, file, cb){    //callback will be exe whenever new file is received
cb(null, './uploads');
  },
  filename: function(req, file, cb){
  cb(null, new Date().toISOString() + file.originalname);   //will be stored with orignal name and todays date
  }
  });

const fileFilter = (req, file, cb) => {
  //determines what files can be uploaded
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }
  else{
      cb(null, false);
    }
};

//get all workouts
router.get('/', (req, res) => {
Workout.find((err, workouts) => {
    if (err) return handleError(res, err);
    console.info('Here are all the workouts that are currently listed on the forum')
    //return res.json(200, workouts);
    return res.status(200).json(workouts);
  });
});



//get an individual workout
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Workout.findById(id, (err, workout) => {
        if (err) return handleError(res, err);

        console.info('Here is the specific workout you asked for' );
        return res.status(200).json(workout);
  } );
});


//post a workout with image
router.post('/image', upload.single('trainerImage'), (req, res) => {      //single means that only one file will be passed.
console.log(req.file);  //this will make a log appear in the console, showing all sorts of info about the file stored
  Workout.create(req.body, function(err, workout) {
    if (err) return handleError(res, err);
    workoutEvent.publish('create_workout_event', workout);
    console.info('Thank you for uploading!');
    return res.status(201).send({workout});
  });
});


//Post a workout
router.post('/', (req, res) => {
     const newWorkout = req.body;
    if (newWorkout) {
           Workout.create(newWorkout, (err, workout) => {
              if (err) return handleError(res, err);
              workoutEvent.publish('create_workout_event', workout);
                 return res.status(201).json(workout);
          });
      } else {
         return handleError(res, err);
      }
});

// upvote a workout
router.post('/:id/upvotes', (req, res) => {
  const id = req.params.id;
  Workout.findById(id, (err, workout) => {
        if (err) return handleError(res, err);
  workout.upvotes++;
  workout.save((err) =>
  {
          if (err) return handleError(res, err);
          console.info('There is now ${upvotes.length} on this workout');
           return res.status(201).send({workout});
  });
  } );
});

//Update workout information
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const workout = await Workout.update({
    _id: req.params.id,
  }, req.body, {
    upsert: false,
  });
  if (!workout) return res.sendStatus(404);
  console.info('Thank you for updating');
  return res.json(200, workout);
}));

//delete a workout
router.delete('/:id', (req, res) => {
  Workout.findById(req.params.id, (err, workout) => {
    if (err) return handleError(res, err);
    if (!workout) return res.send(404);
    workout.remove(function(err) {
      if (err) return handleError(res, err);
      console.info('Workout has been deleted');
      return res.status(204).json({message: "Workout has been deleted"});
    });
  });
});


// add a comment to a specific workout
router.post('/:id/comments', asyncHandler( async (req, res) => {
   const id = req.params.id;
   const comment = req.body;
   const workout = await Workout.findById(id);
   workout.comments.push(comment);
   await workout.save();
  console.info('Your comment has been posted');
   return res.status(201).send({workout});
}));


/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.send(500, err);
};


export default router;
