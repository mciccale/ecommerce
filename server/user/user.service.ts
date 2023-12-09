import { type User } from './user.types';
import UserModel from './user.model';

export class UserService {
  static getAll = async (): Promise<User[]> => {
    const users = await UserModel.find({});
    return users;
  };

  static create = async (user: User): Promise<User> => {
    const createdUser = await new UserModel(user).save();
    return createdUser;
  };

  static remove = async (userId: string): Promise<void> => {
    await UserModel.findByIdAndDelete(userId);
  };
}
