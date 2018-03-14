import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {type: String, required: true},
  author: {type: String, required: true},
  upvotes: {type: Number, default: 0},
  });


const WorkoutSchema = new Schema({
  workout_name: String,
  trainer: String,
  exercise1: String,
  exercise2: String,
  exercise3: String,
  exercise4: String,
  difficulty: String,
  time_in_minutes: {
    type: Number,
    min: 0,
    max: 180,
  },
  username: {type: String, required: false},
  comments: [CommentSchema],
  upvotes: {type: Number, min: 0, max: 50, default: 0},

  updated: {
    type: Date,
    default: Date.now,  //date that workout was updated
  },
});



export default mongoose.model('Workout', WorkoutSchema);
