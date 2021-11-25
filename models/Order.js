const { ObjectId } = require('bson');
const db = require('../database');

const schema = db.Schema({
    customer: {
        type: ObjectId, 
        required: true
    },
    date: Date
}, {collection: "order"});
const Order = db.model('Order', schema);
module.exports = Order;