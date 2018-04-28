import dotenv from 'dotenv';
import express from 'express';
import workoutsRouter from './api/workouts';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {loadWorkouts} from './workoutsData';
import {Mockgoose} from 'mockgoose';


dotenv.config();

export const app = express();

const port = process.env.PORT;

// Connect to database
if (process.env.NODE_ENV == 'test') {
  // use mockgoose for testing
  const mockgoose=new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(()=>{
    mongoose.connect(process.env.mongoDB);
  });
} else {
  // use real deal for everything else
  mongoose.connect(process.env.mongoDB);
}

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: '+ err);
    process.exit(-1);
});



// Populate DB with sample workout data
if (process.env.seedDb) {
  loadWorkouts();
}


if(dotenv.seedDb) {
    loadWorkouts();
}



//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/workouts', workoutsRouter);
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// add middleware to handle any errors.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Something broke! ${err.message}`);
});

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
