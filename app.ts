import express from 'express';
import cors from "cors";
import { router } from './routes/router';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
const port = 3000;
const client = new MongoClient('mongodb://mongo:27017/');

async function start() {
  try {
    await client.connect();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    })
  } catch (e) {
    console.log(e.message)
  }
}

start();

export { client };