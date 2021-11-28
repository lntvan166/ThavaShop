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
});

router.get('/basket', function(req, res, next) {
  res.render('basket');  
});

router.get('/contact', function(req, res, next) {
  res.render('contact');  
});

router.get('/detail', function(req, res, next) {
  res.render('detail');  
});

router.get('/register', function(req, res, next) {
  res.render('register');  
});

router.get('/login', function(req, res, next) {
  res.render('login');  
});

router.get('/text', function(req, res, next) {
  res.render('text');  
});

module.exports = router;
