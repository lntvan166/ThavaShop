const Cart = require("../../models/Cart");

exports.createCart = (customer, productId, quantity) => {
  return Cart.create({
    customer: customer,
    products: [
      {
        product: productId,
        quantity: quantity,
      },
    ],
  });
};

exports.updateCart = (customer, productId, quantity) => {
  return Cart.updateOne(
    { customer: customer },
    {
      $set: {
        "products.$[element].quantity": quantity,
      },
    },
    {
      arrayFilters: [
        {
          "element.product": productId,
        },
      ],
    }
  );
};
