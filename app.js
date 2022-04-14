import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { HttpCode, LIMIT_JSON } from './lib/constants.js';
import routerUser from './routes/auth/index.js';
import routerBank from './routes/bank/index.js';
const { connect, connection } = mongoose;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: LIMIT_JSON }));

app.use('/auth', routerUser);
app.use('/bank', routerBank);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: 'Not found',
  });
});

const uri = process.env.URI_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('connected', () => {
  console.log('Database connection successful');
});

connection.on('error', (err) => {
  console.log(`Database connection error: ${err.message}`);
  process.exit(1);
});

connection.on('disconnected', () => {
  console.log(`Database disconnected from DB`);
  process.exit(1);
});

process.on('SIGINT', async () => {
  connection.close();
  console.log('Connection DB closed');
  process.exit(1);
});

const PORT = process.env.PORT || 4000;

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error: ${err.message}`);
});
