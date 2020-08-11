require('dotenv').config();

var express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

const User = require('../model/user');
// const router = require('./users.js');

// localhost:3000/farmer/
router.get('/farmer', verifyToken, (req,res)=>{
    User.find({role: 'farmer'}, async (err, docs)=>{
        if(!err){
           return res.send(docs);
        }else{
            console.log('Error in Retriving all Products: '+ JSON.stringify(err, undefined, 2));
        }
    });
});

// localhost:3000/farmer/_farmerid/add
router.post('farmer/:farmerid/add', (req, res) => {
    
    const farmer_id = req.params.farmerid;
    const product_name = req.body.product_name;
    const product_description = req.body.product_description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const product_image = req.body.product_image;

    try{
        
        const ProductData = new User({
            name:product_name,
            description:product_description,
            price:price,
            quantity:quantity,
            image:product_image
        })
        
        User.Update({'product._id':product_id}, 
            {'$set': {'product.$.post': ProductData }},
             (err, doc) =>{
                if(!err){
                    res.send(doc);
                }else{
                    console.log('Error in Farmer Product Update: '+ JSON.stringify(err, undefined, 2));
                }
             
        })   
    }catch(e) {
        console.log({message: e});
        res.json({message: e});
    }
});

//localhost:3000/farmer/_id 
router.get('/farmer/:id', (req,res)=>{
    if(!objectId.isValid(req.params.id)){
        return res.status(400).send('No records with given id: '+ $(req.params.id));
    }

    User.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Retriving Products by id: '+ JSON.stringify(err, undefined, 2));
        }
    });
});

// localhost:3000/farmer/_id
router.put('/farmer/:farmerid/:productid', (req, res)=>{
    // if(!objectId.isValid(req.params.farmerid && req.params.productid)){
    //     return res.status(400).send('No records with given farmerid or productid: '+ 
    //         $(req.params.farmerid)+ " or "+ $(req.params.productid));
    //     }

    const product_name = req.body.product_name;
    const product_description = req.body.product_description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const product_image = req.body.product_image;

    try{
        
        const ProductData = new User({
            name:product_name,
            description:product_description,
            price:price,
            quantity:quantity,
            image:product_image
        }) 
        
        User.findByIdAndUpdate(req.params.farmerid, 
            {'$set': {'product.$.name': 'Orange' }},
             {new: true}, (err, doc) =>{
            if(!err){
               res.send(doc);
            }else{
                console.log('Error in Farmer Product Update: '+ JSON.stringify(err, undefined, 2));
            }
        })   
    }catch(e) {
        console.log({message: e});
        res.json({message: e});
    }
});

// localhost:3000/farmer/_id
router.delete('/:id', (req, res)=>{
    if(!objectId.isValid(req.params.id)){
        return res.status(400).send('No records with given id: '+ $(req.params.id));
    }

    User.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Farmer Product Delete: '+ JSON.stringify(err, undefined, 2));
        }
    })   

});

module.exports = router;