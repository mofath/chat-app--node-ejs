const check = require("express-validator").check;

exports.signupValidator = (req, res, next) => {
  console.log("SIGNUP VALIDATOR");
  const { username, email, password, confirmPassword } = req;
  check(username).not().isEmpty().withMessage("username is required"),
    check(email)
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid format"),
    check(password)
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 charachters"),
    check(confirmPassword).custom((value, { req }) => {
      if (value === req.body.password) return true;
      else throw "passwords dont equal";
    });
  next();
};

exports.loginValidator = (req, res, next) => {
  console.log("LOGIN VALIDATOR");
  const { email, password } = req;
  check(email)
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid format"),
    check(password)
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 charachters");
  next();
};
