import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to user handle server!');
});

export default app;
