import { Model } from 'mongoose';

export interface TFullName {
  firstName: string;
  lastName: string;
}

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
  isDeleted?: boolean;
}

// For static methods;
export interface TUserModel extends Model<TUser> {
  isUserExist(userId: number): Promise<TUser | null>;
}
