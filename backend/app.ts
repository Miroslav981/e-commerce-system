import express from "express";
import users from './src/controllers/users';
import products from './src/controllers/products';

const app = express();

app.use('/api/v1/users', users);
app.use('/api/v1/products', products);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!!');
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Express started on port 3000');
  });
}