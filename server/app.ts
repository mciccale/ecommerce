import express from 'express';
import cors from 'cors';
import usersRouter from './user/user.routes';
import { dbConnect } from './utils/dbConnect';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './auth/auth.routes';

const app = express();

dbConnect();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

app.use('/api/login', authRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

export default app;
