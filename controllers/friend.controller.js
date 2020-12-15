const userModel = require("../models/user.model");

exports.add = (req, res, next) => {
  userModel
    .sendFriendRequest(req.body)
    .then(() => {
      res.redirect(`/profile/${req.body.ownerId}`);
    })
    .catch((err) => console.log(err.message));
};

exports.cancel = (req, res, next) => {};

exports.accept = (req, res, next) => {};

exports.reject = (req, res, next) => {};

exports.delete = (req, res, next) => {};
