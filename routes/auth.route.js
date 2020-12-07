const router = require("express").Router();
const bodyParser = require("body-parser");

const authController = require("../controllers/auth.controller");
const validator = require("../middleware/authValidator");

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  validator.signupValidator,
  authController.singup
);

router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  validator.loginValidator,
  authController.login
);

router.get("/logout", authController.logout);

module.exports = router;
