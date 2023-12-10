import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.insertUser);
router.get('/', UserController.findAllUser);
router.get('/:userId', UserController.findOneUser);
router.put('/:userId', UserController.updateOneUser);

export const UserRoutes = router;
