const router = require("express").Router();
const userModel = require("../models/user.model");

router.get("/signup", (req, res, next) => {
  console.log("RENDER SIGNUP PAGE");
  res.render("pages/Signup", {
    authError: req.flash("authError")[0],
    currentUser:null
  });
});

router.get("/login", (req, res, next) => {
  console.log("RENDER LOGIN PAGE");
  res.render("pages/Login", {
    authError: req.flash("authError")[0],
    currentUser: null
  });
});

router.get("/profile/:id?", async (req, res, next) => {
  console.log("RENDER PROFILE PAGE");
  let id = req.params.id || req.session.currentUser.id;
  try {
    const ownerData = await userModel.getUserData(id);
    res.render("pages/Profile", {
      pageTitle: ownerData.username,
      isUser: true,
      owner: {
        id: ownerData._id,
        username: ownerData.username,
        image: ownerData.image,
      },
      currentUser:{
        ...req.session.currentUser,
        friendRequests: req.friendRequests,
      },
      isOwner: id === req.session.currentUser.id,
      isFriend: ownerData.friends.find(
        (friend) => friend.id === req.session.currentUser.id
      ),
      sentRequest: ownerData.friendRequests.find(
        (request) => request.id === req.session.currentUser.id
      ),
      recievedRequest: ownerData.sentRequests.find(
        (request) => request.id === req.session.currentUser.id
      ),
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
