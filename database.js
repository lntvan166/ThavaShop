// Connection URL. This is where your mongodb server is running.
const url = process.env.MONGODB_URI;

const mongoose = require('mongoose')
mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection;
con.on('connected', function() {
    console.log('Database is connected succesfully!');
})
con.on('disconnected', function() {
    console.log('Database is disconnected successfully!');
})
con.on('error', console.error.bind(console, 'connection error:'))
module.exports = mongoose