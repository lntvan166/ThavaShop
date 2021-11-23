const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const slugify = require('slugify');

const schema = mongoose.Schema({
    customer: {
        type: ObjectId, 
        required: true
    },
    date: {
        type: Date
    }
});
const Order = mongoose.model('Order', schema);
module.exports = Order;