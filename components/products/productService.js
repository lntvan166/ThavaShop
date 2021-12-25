const Product = require("../../models/Product");

exports.filter = function (sortBy, brand, color) {
  //filter by brand and color
  if (brand && color) {
    return Product.find({
      brand: { $in: brand },
      color: { $in: color },
    }).sort({ [sortBy]: 1 });
  }

  //filter by brand
  if (brand) {
    return Product.find({
      brand: { $in: brand },
    }).sort({ [sortBy]: 1 });
  }

  //filter by color
  if (color) {
    return Product.find({
      color: { $in: color },
    }).sort({ [sortBy]: 1 });
  }

  return Product.find({}).sort({ [sortBy]: 1 });
};

exports.list = () => Product.find({});

exports.productByID = (id) => Product.findOne({ _id: id });

exports.count = () => Product.count({}).exec();

exports.findByPage = (page, itemPerPage) =>
  Product.find({})
    .skip(page * itemPerPage)
    .limit(itemPerPage);
