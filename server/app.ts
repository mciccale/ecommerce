import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello from a ExpressTS server');
});

app.post('/api/users', (req: Request, res: Response): void => {
  const { body } = req;
  res.json(body);
});

export default app;
