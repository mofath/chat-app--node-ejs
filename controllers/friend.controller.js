const userModel = require("../models/user.model");


exports.cancel = (req, res, next) => {
  console.log("cancel");
  userModel
    .cancelFriendRequest(req.body)
    .then(() => {
      res.redirect(`/profile/${req.body.ownerId}`);
    })
    .catch((err) => console.log(err.message));
};

exports.accept = (req, res, next) => {
  console.log("accept");
  userModel
  .acceptFriendRequest(req.body)
  .then(() => {
    res.redirect(`/profile/${req.body.ownerId}`);
  })
  .catch((err) => console.log(err.message));
};

exports.reject = (req, res, next) => {
  console.log("reject");
  userModel
  .rejectFriendRequest(req.body)
  .then(() => {
    res.redirect(`/profile/${req.body.ownerId}`);
  })
  .catch((err) => console.log(err.message));
};

exports.delete = (req, res, next) => {
  console.log("delete");
  userModel
  .deleteFriend(req.body)
  .then(() => {
    res.redirect(`/profile/${req.body.ownerId}`);
  })
  .catch((err) => console.log(err.message));
};  