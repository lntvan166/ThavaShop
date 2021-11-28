var express = require('express');
var router = express.Router();
const productController = require('./productController')


router.get('/', productController.list);
router.get('/:productId', productController.getProductById);

module.exports = router;