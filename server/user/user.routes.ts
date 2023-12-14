import { Router } from 'express';
import UserController from './user.controller';
import { validateUser } from './user.middlewares';

const usersRouter = Router();

usersRouter.get('/', UserController.getAll);
usersRouter.post('/', validateUser, UserController.create);
usersRouter.delete('/:id', UserController.remove);

export default usersRouter;
