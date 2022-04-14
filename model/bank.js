import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const bankSchema = new Schema(
  {
    bankName: {
      type: String,
      required: [true, 'bankName is required field'],
    },
    interestRate: {
      type: Number,
      required: [true, 'interestRate is required field'],
    },
    maximumLoan: {
      type: Number,
      required: [true, 'maximumLoan is required field'],
    },
    minimumDownPayment: {
      type: Number,
      required: [true, 'minimumDownPayment is required field'],
    },
    loanTerm: {
      type: Number,
      required: [true, 'loanTerm is required field'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Bank = model('bank', bankSchema);

export default Bank;
