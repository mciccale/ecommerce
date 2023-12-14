import { Request, Response, NextFunction } from 'express';
import { IRequestLogin } from './login.types';
import LoginService from './login.service';

class LoginController {
  static login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requestLogin: IRequestLogin = req.body;
      const result = await LoginService.login(requestLogin);

      res.status(201).send(result);
    } catch (e) {
      next(e);
    }
  };
}

export default LoginController;
