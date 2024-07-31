import express from "express";
import cors from "cors";
const app = express();
import cookieParser from "cookie-parser";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//@dec import routes
import userRegisterRoutes from "./routes/user.routes.js";

app.use("/api/v1/user", userRegisterRoutes);

export default app;
