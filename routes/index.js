var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
// const User = require('../models/User') // Tested ok!
// const OrderDetails = require('../models/OrderDetails') // Tested ok!
// const Order = require('../models/Order') // Tested ok!
const Product = require('../models/Product') // Tested ok!

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

  // and log the users (testing)
  Product.find((err, docs) => {
    if (!err) {
      console.log(docs);
      // res.render('list', {
      //   data: docs
      // })
    } else {
      console.log('Failed to retrieve the things: '+e);
    }
  })
});

module.exports = router;
