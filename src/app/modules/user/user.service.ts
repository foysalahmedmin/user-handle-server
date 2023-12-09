import { TUser } from './user.interface';
import { User } from './user.model';

const insertUserIntoDB = async (userData: TUser) => {
  // Build in static method;
  if (await User.isUserExist(userData.userId)) {
    throw new Error('User already exist!');
  }
  const result = await User.create(userData);
  return result;
};

export const UserServices = {
  insertUserIntoDB,
};
