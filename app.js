const express = require("express");
const cookieParse = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const nunjucks = require("nunjucks");
require("dotenv").config();

const pageRouter = require("./routes/page");

const app = express();

app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});
app.set("port", process.env.PORT || 8081);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
app.use(flash());

app.use("/", pageRouter);

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
