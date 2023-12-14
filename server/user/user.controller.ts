import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { IRequestUser, IDatabaseUser } from './user.types';

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
      const { email, username, password }: IRequestUser = req.body;

      const createdUser = await UserService.create({
        email,
        username,
        password,
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
