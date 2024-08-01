import { Router } from "express";
const router = Router();
import {
  postTransaction,
  getTransaction,
  getTotalExpense,
  getTotalIncome,
} from "../controllers/transaction.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route("/").post(verifyJwt, postTransaction);
router.route("/").get(verifyJwt, getTransaction);
router.route("/expense").get(verifyJwt, getTotalExpense);
router.route("/income").get(verifyJwt, getTotalIncome);

export default router;
