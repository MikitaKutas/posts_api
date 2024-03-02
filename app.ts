import express from 'express';
import { MongoClient } from "mongodb";
import cors from "cors";
import { router } from './routes/router';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
const port = 3000;

export const client = new MongoClient('mongodb://localhost:27017/');

async function start() {
  try {
    await client.connect();
    console.log("Connection established");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

start();
