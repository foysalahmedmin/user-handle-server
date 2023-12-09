import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const insertUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const parsedData = userValidationSchema.parse(userData);
    const result = await UserServices.insertUserIntoDB(parsedData);

    res.status(200).json({
      success: true,
      message: 'User is inserted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is went wrong',
      error: err,
    });
  }
};

export const UserController = {
  insertUser,
};
