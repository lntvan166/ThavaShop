const Cart = require("../../models/Cart");
exports.getCart = (customer) => {
  return Cart.findOne({ customer: customer })
    .populate("products.productId")
    .lean();
};

exports.addOrUpdateCart = (customer, productId, quantity) => {
  return Cart.findOne({ customer: customer })
    .then((cart) => {
      if (cart) {
        //check if product already exists in cart
        const productExists = cart.products.some(
          (product) => product.productId.toString() === productId.toString()
        );
        if (productExists) {
          //update quantity
          return Cart.findOneAndUpdate(
            { customer: customer, "products.productId": productId },
            {
              $inc: {
                "products.$.quantity": quantity,
              },
            },
            { new: true }
          );
        } else {
          //add product to cart
          return Cart.findOneAndUpdate(
            { customer: customer },
            {
              $addToSet: {
                products: {
                  productId: productId,
                  quantity: quantity,
                },
              },
            },
            { new: true }
          );
        }
      } else {
        //create new cart
        return Cart.create({
          customer: customer,
          products: [
            {
              productId: productId,
              quantity: quantity,
            },
          ],
        });
      }
    })
    .then((cart) => {
      return cart;
    });
};

exports.removeFromCart = (customer, productId) => {
  return Cart.findOne({ customer: customer }).then((cart) => {
    if (cart) {
      return Cart.findOneAndUpdate(
        { customer: customer },
        {
          $pull: {
            products: {
              productId: productId,
            },
          },
        },
        { new: true }
      );
    }
  });
};
