import bcrypt from 'bcrypt';
import { IRequestLogin } from './login.types';
import UserModel from '../user/user.model';
import { accessToken } from '../utils';
import LoginError from './login.error';

class LoginService {
  static login = async (login: IRequestLogin): Promise<string> => {
    const user = await UserModel.findOne({
      username: login.username,
    });

    if (!user) {
      throw new LoginError(
        `User with username "${login.username}" not found`,
        404
      );
    }

    const passwordCorrect = await bcrypt.compare(
      login.password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      throw new LoginError('Incorrect password', 400);
    }

    return accessToken.generate(user.username);
  };
}

export default LoginService;
