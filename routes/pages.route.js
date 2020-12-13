const router = require("express").Router();
const userModel = require("../models/user.model");

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

router.get("/profile", async (req, res, next) => {
  console.log("RENDER PROFILE PAGE");
  let id = req.params.id || req.session.userId;
  try {
    const userData = await userModel.getUserData(id);
    res.render("pages/Profile", {
      pageTitle: userData.username,
      isUser: true,
      username: userData.username,
      userImage: userData.image,
      isOwner: id === req.session.userId,
      isFriend: userData.friends.find(
        (friend) => friend.id === req.session.userId
      ),
      sentRequest: userData.friendRequests.find(
        (request) => request.id === req.session.userId
      ),
      recievedRequest: userData.sentRequests.find(
        (request) => request.id === req.session.userId
      ),
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
