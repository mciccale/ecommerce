import { NextFunction, Request, Response } from 'express';

import { loginErrorHandler } from './loginErrorHandler';
import { tokenExtractor } from './tokenExtractor';
import { tokenValidator } from './tokenValidator';
import { userExtractor } from './userExtractor';

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
    loginErrorHandler(error, res);
  }
};
