const { ObjectId } = require("mongodb");
const cartService = require("./cartService");
const productService = require("../products/productService");

exports.getCart = async (req, res) => {
  const customer = req.locals?.user._id;
  if (!customer) {
    //get cart from cookie
    const cart = req.cookies?.cart;
    if (cart) {
      //  [
      // { productId: productId, quantity:  1 },
      // { productId: productId, quantity: 2 },
      // { productId: productId, quantity: 4 },
      // { productId: productId, quantity:  1 },
      // ];

      //map productIds list to products list
      const productIds = cart.map((item) => item.productId);
      const products = await productService.getProductsByIds(productIds);
      const cartProducts = cart.map((item) => {
        const product = products.find(
          (product) => product._id == item.productId
        );
        return {
          ...item,
          productId: product,
        };
      });

      //calc total price
      const total = cartProducts.reduce((acc, el) => {
        return acc + el.productId.price * el.quantity;
      }, 0);

      res.render("cart/views/cart.hbs", {
        products: cartProducts,
        total: total.toFixed(2),
        itemsInCart: cartProducts.length,
      });
    } else {
      res.render("cart/views/cart.hbs", {
        products: [],
        total: 0,
        itemsInCart: 0,
      });
    }
  } else {
    const { products } = await cartService.getCart(req.locals?.user._id);
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
  const { productId } = req.body;
  let { quantity } = req.body;
  //if user is logged in
  // await cartService.addOrUpdateCart(
  //   new ObjectId("61acf26071c71a7a9ed10f2e"),
  //   productId,
  //   quantity ?? 1
  // );
  //cast quantity to number
  quantity = Number(quantity ?? 1);

  if (req.locals?.user) {
    await cartService.addOrUpdateCart(
      req.locals.user._id,
      productId,
      quantity ?? 1
    );
  }

  //creat cart array if it doesn't exist
  const initCart = [...(req.cookies?.cart || [])];
  //check if product already exists in cart
  const productExists = initCart.some(
    (product) => product.productId.toString() === productId.toString()
  );
  if (productExists) {
    //update quantity
    const updatedCart = initCart.map((product) => {
      if (product.productId.toString() === productId.toString()) {
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
        productId: productId,
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
    (item) => item.productId.toString() !== productId.toString()
  );
  res.cookie("cart", cart);

  res.redirect("/cart");
};
