const router = require("express").Router();
const bodyParser = require("body-parser");

const authController = require("../controllers/auth.controller");

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  authController.singup
);

router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  authController.login
);

router.get("/logout", authController.logout);

module.exports = router;
