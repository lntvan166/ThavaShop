const Product = require("../../models/Product");

exports.filter = (sortBy) =>
  Product.find({
    // brand: { $in: ["Wrangler", "Buffalo"] },
    // color: { $in: ["White", "Blue"] },
  }).sort({
    [sortBy]: -1,
  });

exports.list = () => Product.find({});

exports.productByID = (id) => Product.findOne({ _id: id });

exports.count = () => Product.count({}).exec();

exports.findByPage = (page, itemPerPage) =>
  Product.find({})
    .skip(page * itemPerPage)
    .limit(itemPerPage);
