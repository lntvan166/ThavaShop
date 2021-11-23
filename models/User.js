const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
});

const User = mongoose.model(' Product', userSchema);
module.exports = User;