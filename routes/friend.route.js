const router = require("express").Router();
const bodyParser = require("body-parser");

const friendController = require("../controllers/friend.controller");

router.post(
  "/add",
  bodyParser.urlencoded({ extended: true }),
  friendController.add
);

module.exports = router;
