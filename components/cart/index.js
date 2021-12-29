var express = require("express");
var router = express.Router();
const cartController = require("./cartController");

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);

module.exports = router;
