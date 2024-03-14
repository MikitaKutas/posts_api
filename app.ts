import express from 'express';
import cors from "cors";
import { router } from './routes/router';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
const port = 3000;

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/posts_api');
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    })

    return mongoose;
  } catch (e) {
    console.log(e.message)
  }
}

export const client = start();