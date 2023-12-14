import bcrypt from 'bcrypt';
import { IDatabaseUser, IRequestUser } from './user.types';
import UserModel from './user.model';

export class UserService {
  static getAll = async (): Promise<IDatabaseUser[]> => {
    const users = await UserModel.find({});
    return users;
  };

  static getByUsername = async (
    username: string
  ): Promise<IDatabaseUser | null> => {
    const user = await UserModel.findOne({ username });
    return user;
  };

  static create = async (user: IRequestUser): Promise<IDatabaseUser> => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const createdUser = await new UserModel({
      passwordHash,
      email: user.email,
      username: user.username,
    }).save();

    return createdUser;
  };

  static remove = async (userId: string): Promise<void> => {
    await UserModel.findByIdAndDelete(userId);
  };
}
