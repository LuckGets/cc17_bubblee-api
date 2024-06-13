require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();

app.use(express.json());
app.use(cors());

// Import router
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const carRouter = require("./router/carRouter");
const reserveRouter = require("./router/reserveRouter");
const transactionRouter = require("./router/transactionRouter");

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/reserve", reserveRouter);
app.use("/transaction", transactionRouter);

// Not found middleware
app.use(notFoundMiddleware);

// Error Middleware
app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server ${process.env.SERVER_PORT} is running...`);
});
