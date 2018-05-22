import express from 'express';
import Workout  from './workoutModel';
import multer from 'multer';
import _ from 'lodash';
const router = express.Router();
var workoutEvent = require("../../events.js")
import asyncHandler from 'express-async-handler';
import UserModel from './../users/userModel';
import j2xml from 'json2xml'


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
    return res.status(200).json(workouts);
  });
});


/**
// get post
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Workout.findById(id, (err, workouts) => {
        if (err) return handleError(res, err);
        return res.send({workouts});
  } );
});
**/


//get an individual workout
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Workout.findById(id, (err, workouts) => {
        if (err) return handleError(res, err);
        //return res.status(200).json(workouts);
       res.format({
            'application/xml': function(){
              var workoutList = workouts.toObject();
              return res.status(201).send(j2x({workouts: workoutList}));}
            ,'default': function(){return res.status(201).json(workouts);}
          });
            } );
          });




//post a workout with image
router.post('/image', upload.single('trainerImage'), (req, res) => {      //single means that only one file will be passed.
console.log(req.file);  //this will make a log appear in the console, showing all sorts of info about the file stored
  Workout.create(req.body, function(err, workouts) {
    if (err) return handleError(res, err);
    workoutEvent.publish('create_workout_event', workouts);
    console.info('Thank you for uploading!');
    return res.status(201).send({workouts});
  });
});


//Post a workout
router.post('/', (req, res) => {
     const newWorkout = req.body;
    if (newWorkout) {
           Workout.create(newWorkout, (err, workouts) => {
              if (err) return handleError(res, err);
              workoutEvent.publish('create_workout_event', workouts);
              return res.status(201).json(workouts);
          });
      } else {
         return handleError(res, err);
      }
});


//Update workout information
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const workouts = await Workout.update({
    _id: req.params.id,
  }, req.body, {
    upsert: false,
  });
  if (!workouts) return res.sendStatus(404);
  console.info('Thank you for updating');
  return res.json(200, workouts);
}));

//delete a workout
router.delete('/:id', (req, res) => {
  Workout.findById(req.params.id, (err, workouts) => {
    if (err) return handleError(res, err);
    if (!workouts) return res.send(404);
    workouts.remove(function(err) {
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
   const workouts = await Workout.findById(id);
   workouts.comments.push(comment);
   await workouts.save();
   console.info('Workout has been deleted');
   return res.status(201).send({workouts});
}));


function handleError(res, err) {
  return res.send(500, err);
};


export default router;
