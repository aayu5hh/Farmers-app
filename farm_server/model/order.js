const mongoose = require('mongoose');
//var objectId = require('mongoose').Types.ObjectId;

const orderSchema = new mongoose.Schema({

    order_items: [{
        product_name: String, 
        quantity: Number, 
        item_total: Number
    }],
    total_price: Number,
    status: String,
    pickup_date: String,
    farmer: {
        id:String,
        first_name: String,
        last_name: String,
        email: String,
        address: String
    },
    customer:{
        id:String,
        first_name: String,
        last_name: String,
        email: String
    }
});

module.exports = mongoose.model('Order', orderSchema);