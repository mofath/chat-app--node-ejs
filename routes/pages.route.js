const router = require("express").Router();

router.get("/signup", (req, res, next) => {
  console.log("RENDER SIGNUP PAGE");
  res.render("pages/Signup", {
    authError: req.flash("authError")[0],
  });
});

router.get("/login", (req, res, next) => {
  console.log("RENDER LOGIN PAGE");
  res.render("pages/Login", {
    authError: req.flash("authError")[0],
  });
});

module.exports = router;