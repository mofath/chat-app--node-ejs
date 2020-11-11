const express = require("express");
const path = require("path");
const DBManager = require("./lib/DBManager");
const authRouter = require("./routes/auth.route");

const app = express();

app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");

/**
 * Instatiatin db instance and connect to db
 */
const DBInstance = new DBManager();
DBInstance.CONNECT();

app.use("/", authRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
