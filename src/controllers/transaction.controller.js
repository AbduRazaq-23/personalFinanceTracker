import { Transaction } from "../models/transaction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//@dec ---------postTransaction details--------------------
const postTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "u should login first");
  }

  const transaction = await Transaction.create({ ...req.body, user: userId });
  if (!transaction) {
    throw new ApiError(401, "something went wrong while creating ");
  }

  return res.status(200).json(new ApiResponse(200, transaction, "data posted"));
});
//@dec ---------getTransaction details--------------------
const getTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "u should login first");
  }

  const transaction = await Transaction.find({ user: userId });

  return res.status(200).json(new ApiResponse(200, transaction, "data posted"));
});

export { postTransaction, getTransaction };
