// backend
const express = require("express");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 获取时间
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// router
app.use("/api/recipe", userRoute);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});

module.exports = app;
