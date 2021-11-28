const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
}, {collection: 'product'});

const Product = mongoose.model('Product', productSchema, 'product');
module.exports = Product;