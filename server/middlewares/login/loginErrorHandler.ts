import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const loginErrorHandler = (error: unknown, res: Response) => {
  if (error instanceof jwt.TokenExpiredError) {
    res.status(401).json({ error: 'Token expired' });
  } else if (error instanceof jwt.JsonWebTokenError) {
    res.status(403).json({ error: 'Invalid token' });
  } else if ((error as Error).message === 'User not found') {
    res.status(404).json({ error: 'User not found' });
  } else if ((error as Error).message === 'Not Authorized') {
    res.status(403).json({ error: 'Not Authorized' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};
