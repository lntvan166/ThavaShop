const db = require('../database');

const userSchema = db.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    birthday: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    }
}, {collection: 'user'});

const User = db.model('User', userSchema);
module.exports = User;