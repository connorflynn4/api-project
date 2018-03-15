import express from 'express';
import Workout  from './workoutModel';
import multer from 'multer';
import _ from 'lodash';
const router = express.Router();

const upload = multer ({dest: './uploads'});   //where multer will store incoming files

/**const upload = multer ({    //alternitive storage using limits,
storage: storage,
limits: {
fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter

});
**/

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

router.get('/', (req, res) => {
  Workout.find((err, workouts) => {
    if (err) return handleError(res, err);
    return res.json(200, workouts);
  });
});

//post a workout
router.post('/', upload.single('trainerImage'), (req, res) => {      //single means that only one file will be passed.
console.log(req.file);  //this will make a log appear in the console, showing all sorts of info about the file stored
  Workout.create(req.body, function(err, workout) {
    if (err) return handleError(res, err);
    return res.json(201, workout);
  });
});


// upvote a workout
router.post('/:id/upvotes', (req, res) => {
  const id = req.params.id;
  Workout.findById(id, (err, post) => {
        if (err) return handleError(res, err);
  post.upvotes++;
  post.save((err) =>
  {
          if (err) return handleError(res, err);
           return res.status(201).send({post});
  });
  } );
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



// Delete a workout
router.delete('/:id', (req, res) => {
  Workout.findById(req.params.id, (err, workout) => {
    if (err) return handleError(res, err);
    if (!workout) return res.send(404);
    workout.remove(function(err) {
      if (err) return handleError(res, err);
      return res.send(204);
     console.log('workout has been deleted');
    });
  });
});



function handleError(res, err) {
  return res.send(500, err);
};

export default router;
