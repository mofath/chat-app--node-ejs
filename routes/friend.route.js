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

router.post(
  "/accept",
  bodyParser.urlencoded({ extended: true }),
  friendController.accept
);

router.post(
  "/reject",
  bodyParser.urlencoded({ extended: true }),
  friendController.reject
);

router.post(
  "/delete",
  bodyParser.urlencoded({ extended: true }),
  friendController.delete,
);

module.exports = router;
