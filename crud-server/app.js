require("dotenv").config();
const express = require("express");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/appError");
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cors = require("cors");

require("./config/passport");

const app = express();
app.use(cors());
app.use(express.json());

//app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY] }));

app.use(passport.initialize());
//app.use(passport.session());

//app.use("/api/v1/xxx", route);

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/products", require("./routes/productRoutes"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
