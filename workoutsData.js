import workoutModel from './api/workouts/workoutModel';

const workouts = [
{

  workoutName: 'Jims Back Workout',
  trainer: 'Jimmy Cricket',
  exercise1: 'Wide Grip Pull Ups - 10x3',
  exercise2: 'Deadlifts - 10x3',
  difficulty: 'Beginner',
  timeInMins: 60,
  comments: []

},

{

 workoutName: 'Eddies Arm Workout',
  trainer: 'Eddie Murphy',
  exercise1: 'Close Grip Pull Ups - 10x3',
  exercise2: 'Single Arm Curl - 10x3',
  difficulty: 'Beginner',
  timeInMins: 60,
  comments: []

},

{

  workoutName: 'Adams Core Workout',
  trainer: 'Adam Smith',
  exercise1: 'Leg Raises - 15x3',
  exercise2: 'Rope Pull Downs - 20x3',
  difficulty: 'Intermediate',
  timeInMins: 90,
  comments: []
},

{

  workoutName: 'Charlies Chest Workout',
  trainer: 'Adam Smith',
  exercise1: 'Bench Press - 10x4',
  exercise2: 'Wide Press Ups - 20x5',
  difficulty: 'Advanced',
  timeInMins: 150,
  comments: []
}
];




export const loadWorkouts = () => {

  workoutModel.find({}).remove(() => {
    workoutModel.collection.insert(workouts, (err, docs)=>{
    if (err) {
      console.log(`Failed to Load Workout Data: ${err}`);  //if unsuccessful
    } else {
      console.info(`${workouts.length} Workouts were added to the forum.`);  //if successful
    }
  });
});
};
