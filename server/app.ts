import cors from 'cors';
import express from 'express';
import userRouter from './user/user.routes';
import loginRouter from './login/login.routes';
import { dbConnect } from './utils/dbConnect';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

dbConnect();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

export default app;
