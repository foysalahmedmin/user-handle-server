import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.insertUser);
router.get('/', UserController.findAllUser);
router.get('/:userId', UserController.findOneUser);
router.put('/:userId', UserController.updateOneUser);
router.delete('/:userId', UserController.deleteOneUser);
router.put('/:userId/orders', UserController.addOrderUser);
router.get('/:userId/orders', UserController.findAllOrderUser);
router.get(
  '/:userId/orders/total-price',
  UserController.findTotalPriceOfOrderUser,
);

export const UserRoutes = router;
