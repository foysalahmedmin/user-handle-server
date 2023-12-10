import { TUser } from './user.interface';
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
  const result = await User.findOne({ userId: userId });
  return result;
};

const updateOneUserFromDB = async (userId: number, userData: TUser) => {
  const result = await User.updateOne({ userId: userId }, userData);
  return result;
};

export const UserServices = {
  insertUserIntoDB,
  findAllUserFromDB,
  findOneUserFromDB,
  updateOneUserFromDB,
};
