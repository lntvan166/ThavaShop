const productService = require("./productService")

exports.list = function (req, res) {
    const products = productService.list()
    res.render('./category.hbs', {products})
}

