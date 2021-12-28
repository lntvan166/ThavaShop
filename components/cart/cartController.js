const { ObjectId } = require("mongodb");
const Cart = require("../../models/Cart");
const cartService = require("./cartService");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.params;

  // const id = new ObjectId();

  // const cart = await cartService.createCart(id, productId, quantity ?? 1);

  //if user is logged in, add to cart
  if (req.locals?.user) {
    const cart = await cartService.createCart(
      req.locals.user._id,
      productId,
      quantity ?? 1
    );
    res.redirect("/category");
  } else {
    //if user is not logged in, add cart to cookie
    const cart = new Cart({ productId: productId, quantity: quantity ?? 1 });
    res.cookie("cart", cart);

    res.redirect("/category");
  }
};
