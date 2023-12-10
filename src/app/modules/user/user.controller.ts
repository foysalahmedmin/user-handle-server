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
      message: 'User created successfully!',
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

const findAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.findAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
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

const findOneUser = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  try {
    const result = await UserServices.findOneUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: err.description || 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something is went wrong',
        error: err,
      });
    }
  }
};

const updateOneUser = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const userUpdatedData = req.body;
  const parsedData = userValidationSchema.parse(userUpdatedData);

  try {
    const result = await UserServices.updateOneUserFromDB(userId, parsedData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: err.description || 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something is went wrong',
        error: err,
      });
    }
  }
};

const deleteOneUser = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  try {
    const result = await UserServices.deleteOneUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted  successfully!',
      data: null,
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: err.description || 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something is went wrong',
        error: err,
      });
    }
  }
};

export const UserController = {
  insertUser,
  findAllUser,
  findOneUser,
  updateOneUser,
  deleteOneUser,
};
