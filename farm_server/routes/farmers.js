require('dotenv').config();

var express = require('express');
var router = express.Router();

const Farmer = require('../model/farmerProductModel.js');

router.post('/prodcuts', async (req,res) => {
    const product_name = req.body.product_name;
    const product_description = req.body.product_description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const product_image = req.body.product_image;

    
    try{
        
        const ProductData = new Farmer({
            name:product_name,
            description:product_description,
            price:price,
            quantity:quantity,
            image:product_image
        })
    
        await ProductData.save();
        console.log(ProductData);    
        res.json("Product Stored Successfully");
        
    }catch(e) {
        console.log({message: e});
        res.json({message: e});
    }
    
});

module.exports = router;