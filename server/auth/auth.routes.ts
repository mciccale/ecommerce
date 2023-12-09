import { Router } from 'express';
import AuthController from './auth.controller';
import { validateUser } from '../user/user.middlewares';

const authRouter = Router();

authRouter.post('/', validateUser, AuthController.login);

export default authRouter;
