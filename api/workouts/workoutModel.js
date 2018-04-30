import mongoose from 'mongoose';
const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
  body: {type: String, required: false},
  author: {type: String, requred: false},
  });

 const WorkoutSchema = new Schema({
     workoutName: {type: String, required:true},
     trainer:     {type: String, required:true},
     exercise1:   {type: String, requred:true},
     exercise2:   {type: String, required: true},
     difficulty:  {type: String, required: true},
     timeInMins:  {type: Number, min: 10, max: 180, required: true },
     username:    {type: String, required: false },
     comments: [CommentSchema],
 });

//custom validation
WorkoutSchema.path('difficulty').validate(function (difficulty) {
    if(difficulty === "Beginner"||difficulty === "Intermediate" ||difficulty === "Advanced")
    {
        return true;
    }
    return false;

});



export default mongoose.model('Workout', WorkoutSchema);
