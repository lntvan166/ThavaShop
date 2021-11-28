const { ObjectId } = require('bson');
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    customer: {
        type: ObjectId, 
        required: true
    },
    date: Date
}, {collection: "order"});
const Order = mongoose.model('Order', schema);
module.exports = Order;