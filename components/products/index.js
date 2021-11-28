var express = require('express');
var router = express.Router();
const productController = require('./productController')

router.get('/', productController.list);

module.exports = router;