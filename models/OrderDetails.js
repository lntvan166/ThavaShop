const { ObjectId, Int32 } = require('bson');
const mongoose = require('mongoose');
const slugify = require('slugify');

const schema = mongoose.Schema({
    orderID: {
        type: ObjectId,
        required: true
    },
    productID: {
        type: ObjectId, 
        required: true
    },
    amount: {
        type: Int32
    }
});
const OrderDetails = mongoose.model('OrderDetails', schema);
module.exports = OrderDetails;