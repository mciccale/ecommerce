import jwt from 'jsonwebtoken';
import config from './config';

const generate = (username: string): string => {
  return jwt.sign({ username }, config.SECRET as string, {
    expiresIn: '1800s',
  });
};

export default { generate };
