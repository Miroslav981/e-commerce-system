import { Router, Request, Response } from 'express';
import { getToken } from '../middlewares/jwt';
import { DB } from '../db-init';
import { User } from '../entities';
import { passwordHash } from '../helpers/password-hash';

const router = Router();

router.get('/login', async (req: Request, res: Response) => {
  const login = <string>req.query.login || undefined;
  const password = <string>req.query.password || undefined;
  if (!login || !password) {
    throw new Error('Missing parameters login or password');
  }

  const auth = await getToken({ login, password, rememberMe: false });

  res.json({
    token: auth.token,
    expiresIn: auth.expiresIn
  });
});

router.get('/register', async (req: Request, res: Response) => {
  const name: string = <string>req.query.name || undefined;
  const email: string = <string>req.query.email || undefined;
  const password: string = <string>req.query.password || undefined;

  if (!name || !email || !password) {
    throw new Error('Missing parameters name, email or password');
  }

  const exists: User = await DB.userRepository.findOne({ email: email });

  if (exists) {
    throw new Error('Email address is already used!');
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