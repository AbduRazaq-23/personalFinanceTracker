import { Router } from "express";
const router = Router();
import {
  postTransaction,
  getTransaction,
} from "../controllers/transaction.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route("/").post(verifyJwt, postTransaction);
router.route("/").get(verifyJwt, getTransaction);

export default router;
