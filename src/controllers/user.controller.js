import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//@dec --------generateRefreshToken----------
const generateRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return refreshToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh token"
    );
  }
};

//@dec --------userRegister controller------------
const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "user already exist u should login");
  }
  const userReg = await User.create({ username, email, password });
  if (!userReg) {
    throw new ApiError(500, "something went wrong while registering user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, userReg, "user registered successfully"));
});
//@dec -------userLogIn controller------------
const userLogIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "user not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "invalid credentials");
  }

  const refreshToken = await generateRefereshTokens(user._id);

  const userLogedIn = await User.findById(user._id).select("-password ");

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: userLogedIn,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});
//@dec -------userLogOut controller------------
const userLogOut = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user?._id, {
    $unset: {
      refreshToken: 1,
    },
  });
  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "user logOut successfully"));
});
//@dec -------userLogIn controller------------
const userUpdate = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(409, "user not exist");
  }
  const userUp = await User.findByIdAndUpdate(req.user?._id, {
    username,
    email,
    password,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, userUp, "user updated successfully"));
});

export { userRegister, userLogIn, userLogOut, userUpdate };
