import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import marked from 'marked';
import { readFileSync } from 'fs';
import 'dotenv/config';
import cors from 'cors';

import helmet from 'helmet';
import MusicRoute from './routes/v1/MusicRoute';
import UsersRoute from './routes/v1/UsersRoute';
import PlaylistRoute from './routes/v1/PlaylistRoute';
import auth from './middleware/auth';

const app = express();
const port = process.env.PORT || 3500;
const env = process.env.NODE_ENV || 'development';
console.log(`${env} build`);

connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connection to the Atlas Cluster is successful!');
  })
  .catch((err) => console.error(err));

app.get('/', (_req, res) => {
  const README = readFileSync(`${__dirname}/../README.md`);
  res.send(marked(README.toString()));
});

app.use(helmet());
app.use(json());
app.use(cors());

app.use('/assets/music', auth);
app.use('/assets', express.static(`${__dirname}/assets`));

app.use('/v1', MusicRoute);
app.use('/v1', UsersRoute);
app.use('/v1', PlaylistRoute);

app.listen(port, () => console.log(`Listening on port ${port}...`));
