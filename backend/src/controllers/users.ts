import { Router, Request, Response } from 'express';
import { users } from '../db.json';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = users.find((f) => {
    return f.id === id;
  });

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