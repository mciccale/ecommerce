import { Request, Response, NextFunction } from 'express';
import { IRequestLogin } from './login.types';
import { UserService } from './login.service';

export default class LoginController {
  static login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestLogin: IRequestLogin = req.body;
      const result = await UserService.login(requestLogin);

      if (result === 'Wrong Credentials') {
        res.status(404).send(result);
      } else {
        res.status(201).send(result);
      }
    } catch (e) {
      next(e);
    }
  };
}
