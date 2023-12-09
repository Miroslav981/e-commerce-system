import { Router, Request, Response } from 'express';
import paginate from '../helpers/paginate';
import { DB } from '../db-init';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const sortByPrice = String(req.query.sortBy)
    .toLowerCase() === 'price';
  const sortByPriceAsc = String(req.query.sortBy)
    .toLowerCase() === 'priceasc';
  const sortByPriceDesc = String(req.query.sortBy)
    .toLowerCase() === 'pricedesc';
  const page = Number(req.query.page || 1);

  let orderBy: object = {
    id: 'DESC'
  };

  const total = await DB.productRepository.count();

  if (sortByPrice || sortByPriceDesc || sortByPriceAsc) {
    orderBy = {
      price: sortByPriceDesc ? 'DESC' : 'ASC'
    };
  }

  const pagi = paginate(total, page, 10);

  const products = await DB.productRepository.findAll({
    orderBy,
    limit: pagi.limit,
    offset: pagi.offset
  });

  res.json({
    totalRecords: total,
    records: products,
    ...pagi
  });
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
