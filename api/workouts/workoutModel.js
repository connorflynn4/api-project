import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
  
  updated: {
    type: Date,
    default: Date.now,  //date that workout was updated
  },
});



export default mongoose.model('Workout', WorkoutSchema);