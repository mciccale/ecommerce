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
      const token = await LoginService.login(requestLogin);

      // Only for browser
      // res.cookie('token', token, { httpOnly: true, secure: true });
      res.status(201).json({ token });
    } catch (e) {
      next(e);
    }
  };
}

export default LoginController;
