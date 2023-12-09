import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { type User } from './user.types';

export default class UserController {
  static getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };

  static create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, username, password }: User = req.body;

      const passwordHash = await bcrypt.hash(password as string, 10);
      const createdUser = await UserService.create({
        email,
        username,
        passwordHash,
      });

      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  };

  static remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await UserService.remove(req.params.id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  };
}
