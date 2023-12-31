import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const insertUserIntoDB = async (userData: TUser) => {
  // Build in static method;
  if (await User.isUserExist(userData.userId)) {
    throw new Error('User already exist!');
  }
  const result = await User.create(userData);
  const user = await User.findOne({ userId: result.userId });
  return user;
};

const findAllUserFromDB = async () => {
  const result = await User.find().select(
    'username fullName age email address',
  );
  return result;
};

const findOneUserFromDB = async (userId: number) => {
  // Build in static method;
  if (!(await User.isUserExist(userId))) {
    throw { code: 404, description: 'User not found!' };
  }
  const result = await User.findOne({ userId: userId });
  return result;
};

const updateOneUserFromDB = async (userId: number, userUpdatedData: TUser) => {
  // Build in static method;
  if (!(await User.isUserExist(userId))) {
    throw { code: 404, description: 'User not found!' };
  }
  const result = await User.updateOne({ userId: userId }, userUpdatedData);
  return result;
};

const deleteOneUserFromDB = async (userId: number) => {
  // Build in static method;
  if (!(await User.isUserExist(userId))) {
    throw { code: 404, description: 'User not found!' };
  }
  const result = await User.updateOne({ userId: userId }, { isDeleted: true });
  return result;
};

const addOrderUserIntoDB = async (userId: number, orderData: TOrder) => {
  // Build in static method;
  if (!(await User.isUserExist(userId))) {
    throw { code: 404, description: 'User not found!' };
  }
  const result = await User.updateOne(
    { userId: userId },
    { $push: { orders: orderData } },
  );
  return result;
};

const findAllOrderUserFromDB = async (userId: number) => {
  // Build in static method;
  if (!(await User.isUserExist(userId))) {
    throw { code: 404, description: 'User not found!' };
  }
  const result = await User.findOne({ userId: userId }).select('orders');
  return result;
};

const findTotalOfOrderUserFromDB = async (userId: number) => {
  // Build in static method;
  if (!(await User.isUserExist(userId))) {
    throw { code: 404, description: 'User not found!' };
  }
  // const result = await User.findOne({ userId: userId }).select('totalPrice');

  const result = await User.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $project: {
        totalPrice: {
          $sum: {
            $map: {
              input: '$orders',
              as: 'order',
              in: { $multiply: ['$$order.price', '$$order.quantity'] },
            },
          },
        },
      },
    },
  ]);

  return result;
};

export const UserServices = {
  insertUserIntoDB,
  findAllUserFromDB,
  findOneUserFromDB,
  updateOneUserFromDB,
  deleteOneUserFromDB,
  addOrderUserIntoDB,
  findAllOrderUserFromDB,
  findTotalOfOrderUserFromDB,
};
