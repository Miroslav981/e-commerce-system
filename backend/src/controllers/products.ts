import { Router, Request, Response } from 'express';
import paginate from '../libs/paginate';
import { DB } from '../db-init';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const sortByPrice = req.query.sortBy === 'price';
  const page = Number(req.query.page || 1);
  const products = await DB.productRepository.findAll();
  let list = products;

  if (sortByPrice) {
    list = [...products].sort((a,b) => {
      const priceA = parseFloat(String(a.price));
      const priceB = parseFloat(String(b.price));

      if (priceA === priceB) {
        return 0;
      }

      return priceA < priceB ? -1 : 1;
    });
  }

  res.json(paginate(list, page, 10));
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product =  await DB.productRepository.findOne({ id });

  if (!product) {
    res.status(404).json({
      code: 404,
      message: 'Product not found'
    });
    return;
  }

  res.json(product);
});

export default router;
