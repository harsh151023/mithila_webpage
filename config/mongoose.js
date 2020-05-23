const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mithila-tiles1');

const db1 = mongoose.connection;

db1.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db1.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db1;