import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import UserModel from '../user/user.model';

export default class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash as string);

    if (passwordCorrect) {
      res.send('Success');
    } else {
      res.send('Fail');
    }
  };
}
