import app from "./app.js";
import dotenv from "dotenv";
import connectDataBase from "./db/database.js";

dotenv.config();

connectDataBase();

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
