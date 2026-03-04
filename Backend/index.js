import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());

pool.connect().then(() => {
    console.log('Connected to the database')
  }).catch((err) => {
    console.error('Error connecting to the database', err);
  });

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 10000');
});