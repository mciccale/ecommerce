import bcrypt from 'bcrypt';
import { IRequestLogin, ILoginToken } from './login.types';
import { accessToken } from '../utils';
import UserModel from '../user/user.model';
import UserError from '../user/user.error';

export class UserService {
  static login = async (login: IRequestLogin): Promise<ILoginToken> => {
    const user = await UserModel.findOne({
      username: login.username,
    });

    if (!user) throw new UserError('User not found', 404);

    const passwordCorrect = await bcrypt.compare(
      login.password,
      user.passwordHash
    );

    if (!passwordCorrect) throw new UserError('Incorrect password', 401);

    const token = accessToken.generate(user.username);

    return { token };
  };
}
