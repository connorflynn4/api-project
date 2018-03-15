import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {type: String, required: true},
  author: {type: String, required: true},
  upvotes: {type: Number, default: 0},
  });


const WorkoutSchema = new Schema({

  workout_name: {
    type: String,
    min: 0,
    max: 20,
    required: true

  },
  trainer: {
    type: String,
    min: 0,
    max: 10,
    requred: true
  },
  exercise1: {
    type: String,
    min: 0,
    max: 25
  },
  exercise2: {
    type: String,
    min: 0,
    max: 25
  },
  exercise3: {
    type: String,
    min: 0,
    max: 25
  },
  exercise4: {
    type: String,
    min: 0,
    max: 25
  },
  difficulty: {
    type: String,
    min: 0,
    max: 15,
    required: true
  },
  time_in_minutes: {
    type: Number,
    min: 0,
    max: 180,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comments: [CommentSchema],
  upvotes: {
    type: Number,
     min: 0,
     max: 50,
     default: 0
   },

  updated: {
    type: Date,
    default: Date.now,  //date that workout was updated
  },
});



export default mongoose.model('Workout', WorkoutSchema);
