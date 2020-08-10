const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    first_name: {type: String, required: true},
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }, 
    role: {type: String, required: true},
    address: String,
    product: [{
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
    }],
    reputation:Number
    
});

module.exports = mongoose.model('User', userSchema);