import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import marked from 'marked';
import { readFileSync } from 'fs';
import atob from 'atob';
import 'dotenv/config';

import musicRouter from './routes/musicReq';
import usersRouter from './routes/handleUsers';

const app = express();
const port = process.env.PORT || 3500;

const decode = atob(process.env.MONGO_URL);

connect(decode, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection to the Atlas Cluster is successful!');
  })
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const README = readFileSync(`${__dirname}/README.md`);
  res.send(marked(README.toString()));
});

app.use(json());

app.use('/assets', express.static(`${__dirname}/assets`));

app.use('/api', musicRouter);
app.use('/api', usersRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));
