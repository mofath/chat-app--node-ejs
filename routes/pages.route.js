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
  let id = req.params.id || req.session.currentUser.id;
  try {
    const userData = await userModel.getUserData(id);
    res.render("pages/Profile", {
      pageTitle: userData.username,
      isUser: true,
      owner: {
        username: userData.username,
        image: userData.image,
      },
      currentUser: req.session.currentUser,
      isOwner: id === req.session.currentUser.id,
      isFriend: userData.friends.find(
        (friend) => friend.id === req.session.currentUser.id
      ),
      sentRequest: userData.friendRequests.find(
        (request) => request.id === req.session.currentUser.id
      ),
      recievedRequest: userData.sentRequests.find(
        (request) => request.id === req.session.currentUser.id
      ),
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
