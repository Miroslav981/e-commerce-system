import { Router, Request, Response } from 'express';
import { getToken } from '../middlewares/jwt';
import { DB } from '../db-init';
import { User } from '../entities';
import { passwordHash } from '../helpers/password-hash';

const router = Router();

router.get('/login', async (req: Request, res: Response) => {
  const login = String(req.query.login);
  const password = String(req.query.password);

  const auth = await getToken({ login, password, rememberMe: false });

  res.json({
    token: auth.token,
    expiresIn: auth.expiresIn
  });
});

router.get('/register', async (req: Request, res: Response) => {
  const name = String(req.query.name);
  const email = String(req.query.email);
  const password = String(req.query.password);

  if (!name || !email || !password) {
    throw new Error('Missing parameters name, email or password');
  }

  const user: User = new User();
  user.name = name;
  user.email = email;
  user.password = passwordHash(password);

  DB.em.persist(user);
  DB.em.flush();

  res.json({
    message: 'success'
  });
});


export default router;