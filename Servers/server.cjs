const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.cjs");
const expertRouter = require("./routes/expertRoute");
const orgRouter = require("./routes/orgRoute");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const callRouter = require("./routes/callReqRoute");
const bodyParser = require("body-parser");
const cloudinary = require("./uploads/cloudinary");
require("dotenv").config();

const PORT = process.env.VITE_MAIN_SERVER_PORT;

//Middlewares
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//Logging for error handling
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  console.log("Request Headers:", req.headers);
  next();
});

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Response Headers:", res.getHeaders());
  });
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());

//Db connection
connectDB();

//Expert routes endpoints
app.use("/expert", expertRouter);

//org endpoints
app.use("/organization", orgRouter);

//User login/signup endpoints
app.use("/user", userRouter);

//Call requests endpoints
app.use("/call", callRouter);

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  next();
});

//Server connection
app.listen(PORT, () => {
  console.log(`Main server running on ${PORT}`);
});