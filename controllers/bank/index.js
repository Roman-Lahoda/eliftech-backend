import Bank from '../../model/bank.js';
import mongoose from 'mongoose';

import { HttpCode } from '../../lib/constants.js';

const createBank = async (req, res, _next) => {
  try {
    const { id: userId } = req.user;
    const createBank = await Bank.create({ ...req.body, owner: userId });
    if (!createBank) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: createBank,
    });
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const updateBank = async (req, res, _next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    console.log('🚀 ~ file: index.js ~ line 37 ~ updateBank ~ id', id);
    const updatedBank = await Bank.findOneAndUpdate(
      { _id: id, owner: userId },
      { ...req.body },
      { new: true }
    );
    if (!updatedBank) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: "Id is'nt indicated",
      });
    }
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: updatedBank,
    });
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const deleteBank = async (req, res, _next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const deletedBank = await Bank.findOneAndRemove({
      _id: id,
      owner: userId,
    });
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: deletedBank,
    });
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

const listBank = async (req, res, _next) => {
  try {
    const { id: userId } = req.user;
    const deletedBank = await Bank.find({
      owner: userId,
    });
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: deletedBank,
    });
  } catch (err) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

export { createBank, updateBank, deleteBank, listBank };
