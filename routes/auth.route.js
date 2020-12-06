const router = require("express").Router();
const bodyParser = require("body-parser");

const authController = require("../controllers/auth.controller");

router.get("/signup", authController.getSingup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  authController.postSingup
);

router.get("/login", authController.getLogin);

router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  authController.postLogin
);

router.get("/logout", authController.logout);

module.exports = router;
