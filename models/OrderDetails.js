const { ObjectId } = require('bson');
const db = require('../database');

const schema = db.Schema({
    orderID: {
        type: ObjectId,
        required: true
    },
    productID: {
        type: ObjectId, 
        required: true
    },
    amount: {
        type: Number
    }
}, {collection: 'orderDetails'});
const OrderDetails = db.model('OrderDetails', schema);
module.exports = OrderDetails;