require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// .env constants
const PORT = process.env.PORT;
const DB = process.env.MONGO_URL;

// mongodb connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((e) => {
    console.log("Connection is unsuccessful", e);
  });

app.use("/user", userRouter);
app.use("/api", require("./routes/upload"));
app.use("/subscription", require("./routes/subscriptionRoutes"));

// Server listener
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
