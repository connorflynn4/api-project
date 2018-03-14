import dotenv from 'dotenv';
import express from 'express';
import workoutsRouter from './api/workouts';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {loadWorkouts} from './workoutsData';


dotenv.config();

// Connect to database
mongoose.connect(process.env.mongoDB);

// Populate DB with sample workout data
if (process.env.seedDb) {
  loadWorkouts();
}


if(dotenv.seedDb) {
    loadWorkouts();
}

const app = express();

const port = process.env.PORT;

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/workouts', workoutsRouter);
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
