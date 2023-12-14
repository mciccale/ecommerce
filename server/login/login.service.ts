import bcrypt from 'bcrypt';
import { type IRequestLogin } from './login.types';
import UserModel from '../user/user.model';

export class UserService {
  // TODO: add JWT
  static login = async (login: IRequestLogin): Promise<string> => {
    const user = await UserModel.findOne({
      username: login.username,
    });

    if (!user) return 'Wrong Credentials';

    const passwordCorrect = await bcrypt.compare(
      login.password,
      user.passwordHash
    );

    return passwordCorrect ? 'Login' : 'Wrong Credentials';
  };
}
