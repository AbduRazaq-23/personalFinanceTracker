import { Router } from "express";
const router = Router();
import { userRegister, userLogIn } from "../controllers/user.controller.js";

router.route("/").post(userRegister);
router.route("/login").post(userLogIn);

export default router;
