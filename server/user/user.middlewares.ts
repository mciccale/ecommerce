import { Request, Response, NextFunction } from 'express';
import { UserZodSchema } from './user.validation';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = UserZodSchema.parse(req.body);
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};
