import express from 'express';
import cors from "cors";
import { router } from './routes/router';
import mongoose from 'mongoose';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
const port = 3000;

function start() {
  try {
    mongoose.connect('mongodb://mongo/?replicaSet=rs0');
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    })

    return mongoose.connection.useDb('posts_api');
  } catch (e) {
    console.log(e.message);
  }
}

export const client = start();