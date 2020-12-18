const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const DBManager = require("./lib/DBManager");
const authRouter = require("./routes/auth.route");
const friendRouter = require("./routes/friend.route");
const pagesRouter = require("./routes/pages.route");
const getFriendRequests = require("./models/user.model").getFriendRequests;

const app = express();

/**
 * configure session
 */
const SessionStore = require("connect-mongodb-session")(session);
const STORE = new SessionStore({
  uri: "mongodb://localhost:27017/chat-app",
  collection: "sessions",
});

app.use(
  session({
    secret: "chat-app",
    saveUninitialized: false,
    store: STORE,
  })
);

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());

app.set("view engine", "ejs");
app.set("views", "views");

/**
 * Instantiating db instance and connect to db
 */
const DBInstance = new DBManager();
DBInstance.CONNECT();

app.use(async (req, res, next) => {
  if (req.session.currentUser) {
    req.friendRequests = await getFriendRequests(req.session.currentUser.id);
    next();
  } else {
    next();
  }
});
app.use("/", authRouter);
app.use("/", pagesRouter);
app.use("/friend", friendRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
