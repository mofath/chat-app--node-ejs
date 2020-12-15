const router = require("express").Router();
const bodyParser = require("body-parser");

const friendController = require("../controllers/friend.controller");

router.post(
  "/add",
  bodyParser.urlencoded({ extended: true }),
  friendController.add
);

router.post(
  "/cancel",
  bodyParser.urlencoded({ extended: true }),
  friendController.cancel
);

module.exports = router;
