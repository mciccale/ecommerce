import jwt from 'jsonwebtoken';
import { IDatabaseUser } from '../../user/user.types';
import { UserService } from '../../user/user.service';

export const userExtractor = async (
  decodedToken: jwt.JwtPayload
): Promise<IDatabaseUser> => {
  const user = await UserService.getByUsername(decodedToken.username);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
