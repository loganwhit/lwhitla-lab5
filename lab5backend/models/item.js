var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    tax: Number,
    itemsSold: Number
});

module.exports = mongoose.model('Item',ItemSchema);
    