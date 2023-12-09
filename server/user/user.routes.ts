import { Router } from 'express';
import UserController from './user.controller';
import { validateUser } from './user.middlewares';

const usersRouter = Router();

// GET
usersRouter.get('/', UserController.getAll);
usersRouter.get('/:id', () => {});

// POST
usersRouter.post('/', validateUser, UserController.create);

// DELETE
usersRouter.delete('/:id', UserController.remove);

// PUT
usersRouter.put('/:id', validateUser, () => {});

export default usersRouter;
