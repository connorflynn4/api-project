import workoutModel from './api/workouts/workoutModel';

const workouts = [
{
  'workout_name': 'Jims Back Workout',
  'trainer': 'Jimmy Cricket',
  'exercise_1': 'Wide Grip Pull Ups - 10x3',
  'exercise_2': 'Deadlifts - 10x3',
  'exercise_3': 'Lat Pull Downs - 10x3',
  'exercise_4': 'One Arm Row - 10x3',
  'difficulty': 'Beginner',
  'time_in_minutes': '60',
  'username': 'flynnboy',
  'comments': [],
  'upvotes': 10
},

{
 'workout_name': 'Eddies Arm Workout',
  'trainer': 'Eddie Murphy',
  'exercise_1': 'Close Grip Pull Ups - 10x3',
  'exercise_2': 'Single Arm Curl - 10x3',
  'exercise_3': 'E-Z Bar Curl - 10x3',
  'exercise_4': 'Assisted Pull Ups - 10x3',
  'difficulty': 'Beginner',
  'time_in_minutes': '60',
  'username': 'jerrydel',
  'comments': [],
  'upvotes': 10
},

{
'workout_name': 'Adams Core Workout',
  'trainer': 'Adam Smith',
  'exercise_1': 'Leg Raises - 15x3',
  'exercise_2': 'Rope Pull Downs - 20x3',
  'exercise_3': '3/4 Sit Ups - 12x3',
  'exercise_4': 'Full Sit Ups - 10x3',
  'difficulty': 'Intermediate',
  'time_in_minutes': '90',
  'username': 'ronniew',
  'comments': [],
  'upvotes': 10
},

{
'workout_name': 'Charlies Chest Workout',
  'trainer': 'Adam Smith',
  'exercise_1': 'Bench Press - 10x4',
  'exercise_2': 'Wide Press Ups - 20x5',
  'exercise_3': 'Dips - 10x5',
  'exercise_4': 'Chest Flys - 15x4',
  'difficulty': 'Advanced',
  'time_in_minutes': '150',
  'username': 'harryp',
  'comments': [],
  'upvotes': 5
}
];

export const loadWorkouts = () => {

  workoutModel.find({}).remove(() => {
    workoutModel.collection.insert(workouts, (err, docs)=>{
    if (err) {
      console.log(`Failed to Load Workout Data: ${err}`);  //if unsuccessful
    } else {
      console.info(`${workouts.length} workouts were added to the forum.`);  //if successful
    }
  });
});
};
