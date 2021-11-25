const db = require('../database');

const productSchema = db.Schema({
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

const Product = db.model('Product', productSchema);
module.exports = Product;