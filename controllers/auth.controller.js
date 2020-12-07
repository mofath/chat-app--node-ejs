const userModel = require("../models/user.model");
const validationResult = require("express-validator").validationResult;

exports.singup = async (req, res, next) => {
  console.log("SIGNUP REQUREST");
  const { username, email, password } = req.body;
  if (validationResult(req).isEmpty()) {
    try {
      await userModel.createNewUser(username, email, password);
      res.redirect("/Login");
    } catch (error) {
      console.log(error);
      req.flash("authError", error);
      res.redirect("/Signup");
    }
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/signup");
  }
};

exports.login = async (req, res, next) => {
  console.log("LOGIN REQUREST");
  const { email, password } = req.body;
  if (validationResult(req).isEmpty()) {
    try {
      const userId = await userModel.login(email, password);
      req.session.userId = userId;
      res.redirect("/");
    } catch (error) {
      console.log(error);
      req.flash("authError", error);
      res.redirect("/Login");
    }
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/login");
  }
};

exports.logout = async (req, res, next) => {
  console.log("LOGOUT REQUREST");

  req.session.destroy(() => {
    res.redirect("/");
  });
};
