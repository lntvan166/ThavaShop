const Product = require("../../models/Product")

exports.list = () => Product.find({}).lean()

exports.productByID = (id) => Product.findOne({_id: id}).lean()