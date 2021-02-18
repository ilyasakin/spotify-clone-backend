import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import marked from 'marked';
import { readFile } from 'fs/promises';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import auth from './middleware/auth';

import routes from './routes'

const app = express();
const port = process.env.PORT || 3500;
const env = process.env.NODE_ENV || 'development';

const main = async () => {
  console.log(`${env} build`);

  try {
    await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Connection to the Atlas Cluster is successful!');
  } catch (error) {
    console.error(error);
  }

  app.get('/', async (_req, res) => {
    const README = await readFile(`${__dirname}/../README.md`);
    res.send(marked(README.toString()));
  });

  app.use(helmet());
  app.use(json());
  app.use(cors());

  app.use('/assets/music', auth);
  app.use('/assets', express.static(`${__dirname}/assets`));

  app.use('/', routes);

  app.listen(port, () => console.log(`Listening on port ${port}...`));
};

main();
