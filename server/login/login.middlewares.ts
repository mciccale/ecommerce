import { Request, Response, NextFunction } from 'express';
import { LoginZodSchema } from './login.validation';

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = LoginZodSchema.parse(req.body);
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};
