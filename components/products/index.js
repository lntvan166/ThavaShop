var express = require('express');
var router = express.Router();
const productController = require('./productController')


router.get('/', productController.category);
router.get('/category?page=', productController.category);
router.get('/product/:slug', productController.getProductBySlug);

router.post("/sort", productController.getSort);

module.exports = router;