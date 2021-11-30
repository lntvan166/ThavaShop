const productService = require("./productService")

exports.category = async function (req, res) {
    var page = req.query.page
    if(!page) page = 1
    const products = await productService.list()
    const length = products.length
    const index = Math.floor(page / 5)
    var pagesNow = []
    for (var i = index * 5 + 1; i < index * 5 + 6; i++) {
        var item = {
            "page": i,
            "active": ""
        }
        if(i == page) item.active = "active"
            
        if (products[(i - 1) * 6]) {
            pagesNow.push(item)
        }
    }  // show 5 pages each time

    const productToShow = []
    for (var i = (page - 1) * 6; i < page * 6; i++){
        if(products[i]) productToShow.push(products[i])
    }
    console.log(productToShow);
    res.render('../components/products/category.hbs', {productToShow, length, pagesNow})
}

exports.getProductById = async function (req, res) {
    const product = await productService.productByID(req.params.productId)
    res.render('../components/products/detail.hbs', {product})
}