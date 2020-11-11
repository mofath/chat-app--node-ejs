const userModel = require("../models/user.model");

exports.getSingup = (req, res, next) => {
  console.log("GET SIGNUP PAGE");
  res.render("pages/Signup");
};

exports.postSingup = async (req, res, next) => {
  console.log("SIGNUP REQUREST");
  const { username, email, password } = req.body;
  try {
    await userModel.createNewUser(username, email, password);
    res.render("pages/Login");
  } catch (error) {
    console.log(error);
    res.render("pages/Signup");
  }
};

exports.getLogin = (req, res, next) => {
  console.log("GET LOGIN PAGE");
  res.render("pages/Login");
};

exports.postLogin = async (req, res, next) => {
  console.log("LOGIN REQUREST");
  const { email, password } = req.body;
  try {
    const userId = await userModel.login(email, password);
    req.session.userId = userId;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("pages/Login");
  }
};
