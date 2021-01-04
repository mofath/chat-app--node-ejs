const userModel = require("../models/user.model");


exports.cancel = (req, res, next) => {
  userModel
    .cancelFriendRequest(req.body)
    .then(() => {
      res.redirect(`/profile/${req.body.ownerId}`);
    })
    .catch((err) => console.log(err.message));
};

exports.accept = (req, res, next) => {
  userModel
  .acceptFriendRequest(req.body)
  .then(() => {
    res.redirect(`/profile/${req.body.ownerId}`);
  })
  .catch((err) => console.log(err.message));
};

exports.reject = (req, res, next) => {
  userModel
  .rejectFriendRequest(req.body)
  .then(() => {
    res.redirect(`/profile/${req.body.ownerId}`);
  })
  .catch((err) => console.log(err.message));
};

exports.delete = (req, res, next) => {
  userModel
  .deleteFriend(req.body)
  .then(() => {
    res.redirect(`/profile/${req.body.ownerId}`);
  })
  .catch((err) => console.log(err.message));
};  