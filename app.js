const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const expressHbs = require("express-handlebars");

const indexRouter = require("./routes/index");
const authRouter = require("./components/auth");
const usersRouter = require("./routes/users");
const productRouter = require("./components/products/index");
const cartRouter = require("./components/cart/index");
const passport = require("./passport");

const app = express();

// view engine setup
const hbs = expressHbs.create({
  defaultLayout: path.join(__dirname, "views/layout"),
  extname: ".hbs",
  helpers: require("./utils/handlebars").helpers,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "components"),
]);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// passport
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/category", productRouter);
app.use("/cart", cartRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
