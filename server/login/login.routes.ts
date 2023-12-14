import { Router } from 'express';
import { validateLogin } from './login.middlewares';
import LoginController from './login.controller';

const loginRouter = Router();

loginRouter.post('/', validateLogin, LoginController.login);

export default loginRouter;
