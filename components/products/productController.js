const productService = require("./productService")

exports.list = async function (req, res) {
    const products = await productService.list().limit(6)
    res.render('../components/products/category.hbs', {products})
}

exports.getProductById = async function (req, res) {
    const product = await productService.productByID(req.params.productId)
    console.log(product);
    res.render('../components/products/detail.hbs', {product})
}