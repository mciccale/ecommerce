import bcrypt from 'bcrypt';
import { IRequestLogin, ILoginToken } from './login.types';
import { accessToken } from '@/utils';
import UserModel from '@/user/user.model';
import LoginError from './login.error';

export class UserService {
  static login = async (login: IRequestLogin): Promise<ILoginToken> => {
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

    return { token: accessToken.generate(user.username) };
  };
}
