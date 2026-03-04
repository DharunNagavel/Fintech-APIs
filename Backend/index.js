import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(10000, () => {
  console.log('Server is running on port 10000');
});