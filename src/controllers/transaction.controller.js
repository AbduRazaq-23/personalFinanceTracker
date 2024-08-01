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
//@dec ---------getTotalExpense details--------------------
const getTotalExpense = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const totalExpenses = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        type: "expense",
      },
    },
    {
      $group: {
        _id: null,
        TotalExpense: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        TotalExpense: 1,
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, totalExpenses, "total of expenses"));
});
//@dec ---------getTotalExpense details--------------------
const getTotalIncome = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const totalIncomes = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        type: "income",
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        totalIncome: 1,
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, totalIncomes, "total of income"));
});

export { postTransaction, getTransaction, getTotalExpense, getTotalIncome };
