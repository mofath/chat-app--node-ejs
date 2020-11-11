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
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/signup");
  }
};

exports.getLogin = (req, res, next) => {
  res.render("login");
};
