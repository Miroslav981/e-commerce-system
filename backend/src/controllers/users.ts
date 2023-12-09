import { Router, Request, Response } from 'express';
import { DB } from '../db-init';
import paginate from '../helpers/paginate';
import { authenticate } from '../middlewares/jwt';

const router = Router();

router.use(authenticate);

router.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);

  const total = await DB.userRepository.count();

  const pagi = paginate(total, page, 10);

  const users = await DB.userRepository.findAll({
    limit: pagi.limit,
    offset: pagi.offset
  });

  res.json({
    totalRecords: total,
    records: users,
    ...pagi
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await DB.userRepository.findOne({ id });

  if (!user) {
    res.status(404).json({
      code: 404,
      message: 'User not found'
    });
    return;
  }

  res.json(user);
});

export default router;