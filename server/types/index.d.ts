import { JwtPayload } from 'jsonwebtoken';
import { IDatabaseUser } from '../user/user.types';

export {};

declare global {
  namespace Express {
    export interface Request {
      token?: JwtPayload;
      user?: IDatabaseUser;
    }
  }
}
