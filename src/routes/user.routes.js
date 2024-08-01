import { Router } from "express";
const router = Router();
import {
  userRegister,
  userLogIn,
  userLogOut,
  userUpdate,
} from "../controllers/user.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route("/").post(userRegister);
router.route("/login").post(userLogIn);
router.route("/").patch(verifyJwt, userLogOut);
router.route("/update").patch(verifyJwt, userUpdate);

export default router;
