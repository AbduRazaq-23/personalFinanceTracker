import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const connectDataBase = asyncHandler(async () => {
  await mongoose.connect(process.env.MONGOOSE_URI);
  console.log("mongodb connected");
});

export default connectDataBase;
