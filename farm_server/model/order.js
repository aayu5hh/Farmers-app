const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    order_items: [{
        product_name: String, 
        quantity: Number, 
        item_total: Number
    }],
    total_price: Number,
    status: String,
    pickup_date: Date,
    farmer: {
        id:Objectid(),
        first_name: String,
        last_name: String,
        email: String,
        address: String
    },
    customer:{
        id:Objectid(),
        first_name: String,
        last_name: String,
        email: String
    }
});

module.exports = mongoose.model('Order', orderSchema);