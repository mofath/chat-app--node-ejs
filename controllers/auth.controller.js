const userModel = require("../models/user.model");

exports.singup = async (req, res, next) => {
  console.log("SIGNUP REQUREST");
  const { username, email, password } = req.body;
  try {
    await userModel.createNewUser(username, email, password);
    res.render("pages/Login");
  } catch (error) {
    console.log(error);
    req.flash("authError", error);
    res.render("pages/Signup");
  }
};

exports.login = async (req, res, next) => {
  console.log("LOGIN REQUREST");
  const { email, password } = req.body;
  try {
    const userId = await userModel.login(email, password);
    req.session.userId = userId;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("authError", error);
    res.redirect("/Login");
  }
};

exports.logout = async (req, res, next) => {
  console.log("LOGOUT REQUREST");

  req.session.destroy(() => {
    res.redirect("/");
  });
};
