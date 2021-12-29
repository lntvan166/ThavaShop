const { ObjectId } = require("mongodb");
const cartService = require("./cartService");
const productService = require("../products/productService");

exports.getCart = async (req, res) => {
  const customer = req.locals?.user._id;
  if (!customer) {
    //get cart from cookie
    const cart = req.cookies?.cart;
    if (cart) {
      // const cart = [
      //   ...(req.cookies?.cart || []),
      //   { product, quantity: quantity ?? 1 },
      // ];
      console.log(cart);
      const total = cart.reduce((acc, el) => {
        return acc + el.productId.price * el.quantity;
      }, 0);

      res.render("cart/views/cart.hbs", {
        products: cart,
        total: total.toFixed(2),
        itemsInCart: cart.length,
      });
    } else {
      res.render("cart/views/cart.hbs", {
        products: [],
        total: 0,
        itemsInCart: 0,
      });
    }
  } else {
    // const { products } = await cartService.getCart(
    //   new ObjectId("61acf26071c71a7a9ed10f2e")
    // );

    const itemsInCart = products.length;
    const total = products.reduce((acc, product) => {
      return acc + product.productId.price * product.quantity;
    }, 0);

    res.render("cart/views/cart.hbs", {
      products,
      total: total.toFixed(2),
      itemsInCart,
    });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  //if user is logged in
  // await cartService.addOrUpdateCart(
  //   new ObjectId("61acf26071c71a7a9ed10f2e"),
  //   productId,
  //   quantity ?? 1
  // );

  if (req.locals?.user) {
    await cartService.addOrUpdateCart(
      req.locals.user._id,
      productId,
      quantity ?? 1
    );
  }

  const product = await productService.productByID(productId);
  //creat cart array if it doesn't exist
  const initCart = [...(req.cookies?.cart || [])];
  //check if product already exists in cart
  const productExists = initCart.some(
    (product) => product.productId._id.toString() === productId.toString()
  );
  if (productExists) {
    //update quantity
    const updatedCart = initCart.map((product) => {
      if (product.productId._id.toString() === productId.toString()) {
        return {
          productId: product.productId,
          quantity: product.quantity + (quantity ?? 1),
        };
      } else {
        return product;
      }
    });
    res.cookie("cart", updatedCart);
  } else {
    //add product to cart
    const updatedCart = [
      ...initCart,
      {
        productId: product,
        quantity: quantity ?? 1,
      },
    ];
    res.cookie("cart", updatedCart);
  }

  res.redirect("/category");
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  // await cartService.removeFromCart(
  //   new ObjectId("61acf26071c71a7a9ed10f2e"),
  //   productId
  // );

  if (req.locals?.user) {
    await cartService.removeFromCart(req.locals.user._id, productId);
  }

  const cart = req.cookies?.cart.filter(
    (item) => item.productId._id.toString() !== productId.toString()
  );
  res.cookie("cart", cart);

  res.redirect("/cart");
};
