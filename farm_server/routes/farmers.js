require('dotenv').config();

var express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

const Farmer = require('../model/user.js');
const { route } = require('./users.js');

// localhost:3000/farmers/
router.get('/farmer', (req,res)=>{
    Farmer.find((err, docs)=>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in Retriving all Products: '+ JSON.stringify(err, undefined, 2));
        }
    });
});
router.post('farmer/product/add', (req, res) => {
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
        
        ProductData.save((err, docs) => {
            if (!err) {
                res.send(docs);
              } else { 
                 console.log("Error in product addition: "+ JSON.stringify(err, undefined, 2));
              } 
        })   
    }catch(e) {
        console.log({message: e});
        res.json({message: e});
    }
});

//localhost:3000/farmers/_id 
router.get('/farmer/:id', (req,res)=>{
    if(!objectId.isValid(req.params.id)){
        return res.status(400).send('No records with given id: '+ $(req.params.id));
    }

    Farmer.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Retriving Products by id: '+ JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/farmer/:id', (req, res)=>{
    if(!objectId.isValid(req.params.id)){
        return res.status(400).send('No records with given id: '+ $(req.params.id));
    }

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
        
        Farmer.findByIdAndUpdate(req.params.id, {$set: ProductData}, {new: true}, (err, doc) =>{
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

router.delete('/:id', (req, res)=>{
    if(!objectId.isValid(req.params.id)){
        return res.status(400).send('No records with given id: '+ $(req.params.id));
    }

    Farmer.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in Farmer Product Delete: '+ JSON.stringify(err, undefined, 2));
        }
    })   

});

module.exports = router;