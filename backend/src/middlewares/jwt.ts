import { passwordCheck } from '../helpers/password-hash';
import { DB } from '../db-init';
import {
  AuthenticationInterface, AuthenticationResponseInterface
} from '../interfaces/authentication.interface';
import { Secret, JwtPayload, sign, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities';

export const SECRET_KEY: Secret = 'tv45398yubvgt53niu@ioerwtygtf54y7hpnogb95';

export interface JwtRequest extends Request {
  user: User;
  token: string | JwtPayload;
}

export async function getToken(
  auth: AuthenticationInterface
): Promise<AuthenticationResponseInterface> {
  const foundUser = await DB.userRepository.findOne({ email: auth.login });

  if (!foundUser) {
    throw new Error('Incorrect credentials');
  }

  const isMatch = passwordCheck(auth.password, foundUser.password);

  if (isMatch) {
    const token: string = <string>sign(
      {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    return { user: foundUser, token: token, expiresIn: '1d' };
  } else {
    throw new Error('Incorrect credentials');
  }
}

export async function authenticate(
  req: JwtRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      token = String(req.query.jwt);
    }

    if (!token) {
      throw new Error();
    }

    const verified: JwtPayload = <JwtPayload>verify(
      token,
      SECRET_KEY,
      { complete: false }
    );

    const foundUser = await DB.userRepository
      .findOne({ id: <number>verified.id });

    req.user = foundUser;
    req.token = token;

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authenticion Failed: Access Denied'
    });
  }
}