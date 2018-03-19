import express from 'express';
import Workout  from './workoutModel';
import multer from 'multer';
import _ from 'lodash';
const router = express.Router();
var jwt = require('jsonwebtoken');

const upload = multer ({dest: './uploads'});   //where multer will store incoming files

/**const upload = multer ({    //alternitive storage using limits, path not working
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

//get all workouts
router.get('/', (req, res) => {
  Workout.find((err, workouts) => {
    if (err) return handleError(res, err);
    console.info('Here are all the workouts that are currently listed on the forum')
    return res.json(200, workouts);
  });
});

//get webtoken
router.post('/login', (req, res) => {
//admin user
const user = {
  id: 1,
  username: 'connor',
  email: 'connorflynn4@gmail.com'
}

  jwt.sign({user: user}, 'secretkey', (err, token) => {   //callback to send token
    res.json({
      token: token
    })
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


//post a workout
router.post('/', upload.single('trainerImage'), (req, res) => {      //single means that only one file will be passed.
console.log(req.file);  //this will make a log appear in the console, showing all sorts of info about the file stored
  Workout.create(req.body, function(err, workout) {
    if (err) return handleError(res, err);
    console.info('Thank you for posting this workout');
    return res.json(201, workout);
  });
});


// upvote a workout
router.post('/:id/upvotes', (req, res) => {
  const id = req.params.id;
  Workout.findById(id, (err, post) => {
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



// Update a workout
router.put('/:id', (req, res) => {
if (req.body._id) delete req.body._id;
 Workout.findById(req.params.id, (err, workout) => {
   if (err) return handleError(res, err);
  if (!workout) return res.send(404);
  const updated = _.merge(workout, req.body);
  updated.save((err) => {
    if (err) return handleError(res, err);
    console.info('You have updated your workout');
    return res.json(200, workout);
  });
  });
});


//Authorized delete workout using webtoken
 router.delete('/:id', verifyToken, (req, res) => {
 jwt.verify(req.token, 'secretkey', (err, authData) => {
     if(err) {
       res.sendStatus(403);
     } else {
       Workout.findById(req.params.id, (err, workout) => {
          if (err) return handleError(res, err);
           if (!workout) return res.send(404);
           workout.remove(function(err) {
             if (err) return handleError(res, err);
             console.info('workout has been deleted');
             return res.send(204);
           });
          });
     }
   });
 });



//post a comment on a workout
router.post('/:id/comments', (req, res) => {
   const id = req.params.id;
   const comment = req.body;
   Workout.findById(id, (err, post)=>{
     if (err) return handleError(res, err);
        workout.comments.push(comment);
        workout.save((err) => {
          if (err) return handleError(res, err);
          console.info('you have added a comment to this workout')
           return res.status(201).send({workout});
        });
  });
});

//format of token is Authorization: Bearer <access_token>
//.split will turn this into an array, with <access_token> being 0 index of the array
//Verify token function
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

function handleError(res, err) {
  return res.send(500, err);
};

export default router;
