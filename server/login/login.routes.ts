import { Router } from 'express';
import LoginController from './login.controller';
import { validateLogin } from './login.middlewares';

const loginRouter = Router();

loginRouter.post('/', validateLogin, LoginController.login);

export default loginRouter;
