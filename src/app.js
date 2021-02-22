import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import marked from 'marked';
// eslint-disable-next-line import/no-unresolved
import { readFile } from 'fs/promises';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import auth from './middleware/auth';

import routes from './routes';

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
    if (process.env.MONGO_URL) {
      console.error(error);
      process.exit(1);
    } else {
      console.error('MONGO_URL is undefined');
      process.exit(1);
    }
  }

  app.get('/', async (_req, res) => {
    const README = await readFile(`${__dirname}/../README.md`);
    res.send(marked(README.toString()));
  });

  app.use(morgan('combined'));
  app.use(helmet());
  app.use(json());
  app.use(cors());

  app.use('/assets/music', auth);
  app.use('/assets', express.static(`${__dirname}/assets`));

  app.use('/', routes);

  app.listen(port, () => console.log(`Listening on port ${port}...`));
};

main();
