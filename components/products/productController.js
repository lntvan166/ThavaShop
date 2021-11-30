const productService = require("./productService")

exports.category = async function (req, res) {
    var page = req.query.page
    if(!page) page = 1
    const products = await productService.list()
    const length = products.length
    
    // page bar
    const pageIndex = Math.floor(page / 5) * 5 + 1
    var pageBar = []
    for (var i = pageIndex; i < pageIndex + 5; i++) {
        var item = {
            "page": i,
            "active": ""
        }
        if(i == page) item.active = "active"
            
        if (products[(i - 1) * 6]) {
            pageBar.push(item)
        }
    }  // show 5 pages each time

    var previous = {
        "isHas": true,
        "page": pageIndex - 1
    }

    var next = {
        "isHas": true,
        "page": pageIndex + 1
    }

    if (pageIndex == 1) previous.isHas = false
    if (!products[(pageIndex + 5) * 6]) next.isHas = false

    // product
    const productToShow = []
    for (var i = (page - 1) * 6; i < page * 6; i++){
        if(products[i]) productToShow.push(products[i])
    }

    res.render('../components/products/category.hbs', {productToShow, length, pageBar, previous, next})
}

exports.getProductById = async function (req, res) {
    const product = await productService.productByID(req.params.productId)
    res.render('../components/products/detail.hbs', {product})
}