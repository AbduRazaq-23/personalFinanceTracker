import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    throw new ApiError(400, "unauthorized request");
  }
  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select("-password");

  if (!user) {
    throw new ApiError(401, "invalid token");
  }

  req.user = user;
  next();
});

export { verifyJwt };
