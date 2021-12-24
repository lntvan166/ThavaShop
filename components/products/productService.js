    const Product = require("../../models/Product")

exports.list = () => Product.find({})

exports.productByID = (id) => Product.findOne({ _id: id })

exports.productBySlug = (slug) => Product.findOne({ slug: slug })

exports.count = () => Product.count({}).exec()

exports.findByPage = (page, itemPerPage) => Product.find({}).skip(page * itemPerPage).limit(itemPerPage)