import express from "express";
import users from './src/controllers/users';
import products from './src/controllers/products';
import { RequestContext } from '@mikro-orm/core';
import { DB } from './src/db-init';

const app = express();

app.use((req, res, next) => {
  RequestContext.create(DB.em, next);
});

app.use('/api/v1/users', users);
app.use('/api/v1/products', products);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!!');
});

if (require.main === module) {
  app.listen(8080, () => {
    console.log('Express started on port http://localhost:8080');
  });
}
