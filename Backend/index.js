import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import { authrouter } from './routes/auth.route.js';
import mailrouter from './routes/mail.route.js';

const app = express();
const PORT = 1000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authrouter);
app.use('/mail', mailrouter);

pool.connect().then(() => {
    console.log('Connected to the database')
  }).catch((err) => {
    console.error('Error connecting to the database', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});