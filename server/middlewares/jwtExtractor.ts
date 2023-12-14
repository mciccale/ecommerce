import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../utils';
import { UserService } from '../user/user.service';
import { IDatabaseUser } from '../user/user.types';

const bearer = 'Bearer ';

export const jwtExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = tokenExtractor(req);
    if (!token) {
      res.status(403).json({ error: 'Not Authorized' });
      return;
    }

    const decodedToken = tokenValidator(token);
    req.token = decodedToken;

    const user = await userExtractor(decodedToken);
    req.user = user;

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

const tokenExtractor = (req: Request): string => {
  const authorization = req.header('authorization');

  if (!authorization || !authorization.startsWith(bearer)) {
    throw new Error('Not Authorized');
  }

  return authorization.replace(bearer, '');
};

const tokenValidator = (token: string) => {
  try {
    return <jwt.JwtPayload>jwt.verify(token, config.SECRET as string);
  } catch (error) {
    throw error;
  }
};

const userExtractor = async (
  decodedToken: jwt.JwtPayload
): Promise<IDatabaseUser> => {
  const user = await UserService.getByUsername(decodedToken.username);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const errorHandler = (error: unknown, res: Response) => {
  if (error instanceof jwt.TokenExpiredError) {
    res.status(401).json({ error: 'Token expired' });
  } else if (error instanceof jwt.JsonWebTokenError) {
    res.status(403).json({ error: 'Invalid token' });
  } else if ((error as Error).message === 'User not found') {
    res.status(404).json({ error: 'User not found' });
  } else if ((error as Error).message === 'Not Authorized') {
    res.status(403).json({ error: 'Not Authorized' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};
