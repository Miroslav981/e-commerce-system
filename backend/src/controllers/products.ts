import { Router, Request, Response } from 'express';
import { products } from '../db.json';

const paginate = (array: object[], page: number, limit: number) => {
  const offset = Math.floor((page - 1) * limit);
  const total = array.length || 0;
  const pages = Math.ceil(total / limit);

  const result = [...array].slice(offset, (offset + limit));

  return {
    totalPages: pages,
    records: result,
    page,
    offset,
    limit,
    totalRecords: total
  };
};

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const sortByPrice = req.query.sortBy === 'price';
  const page = Number(req.query.page || 1);
  let list = products;

  if (sortByPrice) {
    list = [...products].sort((a,b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      if (priceA === priceB) {
        return 0;
      }

      return priceA < priceB ? -1 : 1;
    });
  }

  res.json(paginate(list, page, 10));
});

router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = products.find((f) => {
    return f.id === id;
  });

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
