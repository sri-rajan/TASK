import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import studentRoute from "./routes/student.js";
import classRoute from "./routes/class.js";
import feesRoute from "./routes/fees.js";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((e) => console.log(e));

//middleware
app.use(express.json());
app.use("/api/parent/", authRoute);
app.use("/api/student/", studentRoute);
app.use("/api/class/", classRoute);
app.use("/api/fees/", feesRoute);

app.listen(process.env.PORT, () => {
  console.log("backend connected");
});
