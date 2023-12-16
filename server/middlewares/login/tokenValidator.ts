import jwt from 'jsonwebtoken';

import { config } from '../../utils';

export const tokenValidator = (token: string) => {
  try {
    return <jwt.JwtPayload>jwt.verify(token, config.SECRET as string);
  } catch (error) {
    throw error;
  }
};
