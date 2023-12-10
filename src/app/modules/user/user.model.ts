import bcrypt from 'bcrypt';
import { Query, Schema, model } from 'mongoose';
import config from '../../config';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  TUserModel,
} from './user.interface';

// Custom validator;
function capitalizeValidator(value: string) {
  const correctValue =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  return value === correctValue;
}

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Schema;
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: 20,
    trim: true,
    validate: {
      validator: capitalizeValidator,
      message: '{VALUE} is not in capitalize format',
    },
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    validate: {
      validator: capitalizeValidator,
      message: '{VALUE} is not in capitalize format',
    },
  },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema = new Schema<TUser>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      select: false,
      required: true,
      minlength: [6, 'The password should be a minimum of 6 characters'],
      maxlength: [12, 'The password should be a maximum of 12 characters'],
    },
    fullName: {
      type: fullNameSchema,
      required: true,
    },
    age: { type: Number, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: isValidEmail,
        message: '{VALUE} is not a valid email address',
      },
    },
    isActive: { type: Boolean, default: true, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: [orderSchema] },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Pre save middleware/ hook
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/ hook
UserSchema.post('save', function (document, next) {
  document.password = '';
  document.toObject();
  delete (document as any).password;
  document.toJSON();
  next();
});

// Pre hook for query middleware
UserSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.select('-password');
  next();
});

// Custom static methods ;
UserSchema.statics.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId: userId });
  return existingUser;
};

export const User = model<TUser, TUserModel>('User', UserSchema);
