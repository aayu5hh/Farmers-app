const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },
    product_description:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }, 
    product_image: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Farmer', productSchema);