import { Router, Request, Response } from 'express';
import { DB } from '../db-init';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await DB.userRepository.findAll();
  res.json(users);
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