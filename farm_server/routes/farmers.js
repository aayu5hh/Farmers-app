require('dotenv').config();

var express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

const User = require('../model/user');
// const router = require('./users.js');

// localhost:3000/farmer/
router.get('/farmer', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all Products: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// localhost:3000/farmer/_farmerid/add
router.post('/farmer/:farmerid/add', (req, res) => {

    const farmer_id = req.params.farmerid;
    const { product_name, product_description, price, quantity, product_image } = req.body.product[0]
    console.log(req.body)

    try {

        const ProductData = {
            product_name,
            product_description,
            price,
            quantity,
            product_image
        }

        User.update({ '_id': farmer_id },
            { '$push': { 'product': ProductData } },
            (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log('Error in Farmer Product Update: ' + JSON.stringify(err, undefined, 2));
                    next(err);
                }

            })
    } catch (e) {
        console.log({ message: e });
        res.json({ message: e });
    }
});

//To get farmer with farmerid
//localhost:3000/:farmerid/ 
router.get('/farmer/:farmerid', (req, res) => {

    User.find({'_id': req.params.farmerid}, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Products by id: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

//To get all products of farmer with farmerid and productid
//localhost:3000/:farmerid/_productid 
router.get('/farmer/:farmerid/:productid', (req, res) => {

    User.find({'product._id': req.params.productid}, ['product'], (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Products by id: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

// localhost:3000/farmer/_id
router.patch('/farmer/:farmerid/:productid', (req  ,res) => {
    const farmer_id = req.params.farmerid
    const product_id = req.params.productid;
    const name = req.body.product[0].product_name;
    const description = req.body.product[0].product_description;
    const price = req.body.product[0].price;
    const quantity = req.body.product[0].quantity;
    const image = req.body.product[0].product_image;
    console.log(req.body);

    try {
    
        User.findOneAndUpdate({'_id':farmer_id, 'product._id':product_id},
         {$set:{ 'product.$.product_name': name,
                'product.$.product_description': description,
                'product.$.price': price,
                'product.$.quantity': quantity,
                'product.$.product_image': image,
        }},
            (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log('Error in Farmer Product Update: ' + JSON.stringify(err, undefined, 2));
                    
                }

            })
    } catch (e) {
        console.log({ message: e });
        res.json({ message: e });
    }

});

// localhost:3000/farmer/_id
router.delete('/farmer/:farmerid/:productid', (req, res) => {

    User.findByIdAndRemove({'product._id': req.params.productid}, ['product'], (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Farmer Product Delete: ' + JSON.stringify(err, undefined, 2));
        }
    })

});

module.exports = router;