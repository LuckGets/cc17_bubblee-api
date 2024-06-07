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

app.use("/auth", authRouter);
app.use("/users", userRouter);
// Not found middleware
app.use(notFoundMiddleware);

// Error Middleware
app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server ${process.env.SERVER_PORT} is running...`);
});
