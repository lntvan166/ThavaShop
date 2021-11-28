const productService = require("./productService")

exports.list = async function (req, res) {
    const products = await productService.list().limit(6)
    res.render('../components/products/category.hbs', {products})
}

