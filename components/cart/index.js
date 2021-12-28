var express = require("express");
var router = express.Router();
const cartController = require("./cartController");

// router.get("/cart", cartController.getCart);
router.get("/:productId", cartController.addToCart);

module.exports = router;
