import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.insertUser);

export const UserRoutes = router;
