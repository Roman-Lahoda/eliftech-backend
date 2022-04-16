import Joi from 'joi';

const createBankSchema = Joi.object({
  bankName: Joi.string().required(),
  interestRate: Joi.number().positive().required(),
  maximumLoan: Joi.number().positive().required(),
  minimumDownPayment: Joi.number().positive().required(),
  loanTerm: Joi.number().positive().required(),
});

const updateBankSchema = Joi.object({
  bankName: Joi.string().optional(),
  interestRate: Joi.number().positive().optional(),
  maximumLoan: Joi.number().positive().optional(),
  minimumDownPayment: Joi.number().positive().optional(),
  loanTerm: Joi.number().positive().optional(),
  _id: Joi.string().optional(),
  owner: Joi.string().optional(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
});

export const validateCreateBank = async (req, res, next) => {
  try {
    await createBankSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field : ${err.message.replace(/"/g, '')}` });
  }
  next();
};

export const validateUpdateBank = async (req, res, next) => {
  try {
    await updateBankSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field : ${err.message.replace(/"/g, '')}` });
  }
  next();
};
