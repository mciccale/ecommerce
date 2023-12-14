import { NextFunction, Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import { ZodError } from 'zod';
import UserError from '../user/user.error';

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({ message: error.message });
  } else if (error instanceof MongooseError) {
    res.status(400).json({ message: error.message });
  } else if (error instanceof UserError) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
