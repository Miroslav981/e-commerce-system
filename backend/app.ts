import express, {
  Request,
  Response
} from 'express';
import 'express-async-errors';
import users from './src/controllers/users';
import products from './src/controllers/products';
import authentication from './src/controllers/authentication';
import { RequestContext } from '@mikro-orm/core';
import { DB } from './src/db-init';
import cors from 'cors';
import dotenv from 'dotenv';
import './src/process';
import { handleError } from './src/error-handler';

const app = express();
// Cors
app.use(cors());
//configure env;
dotenv.config();
// Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  RequestContext.create(DB.em, next);
});

app.use('/api/v1/auth', authentication);
app.use('/api/v1/users', users);
app.use('/api/v1/products', products);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!');
});

app.use(handleError);

app.listen(8080, () => {
  console.log('Express started on port http://localhost:8080');
});
