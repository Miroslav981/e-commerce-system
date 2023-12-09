import { User } from '../entities';

export interface AuthenticationInterface {
  login: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthenticationResponseInterface {
  user: User,
  token: string;
  expiresIn: string;
}