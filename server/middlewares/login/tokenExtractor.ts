import { Request } from 'express';

const bearer = 'Bearer ';

export const tokenExtractor = (req: Request): string => {
  const authorization = req.header('authorization');

  if (!authorization || !authorization.startsWith(bearer)) {
    throw new Error('Not Authorized');
  }

  return authorization.replace(bearer, '');
};
