const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");

const app = express();

const port = 7000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(port, () => console.log("Listening"));
module.exports = app;
