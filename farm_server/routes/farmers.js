require('dotenv').config();

var express = require('express');
var router = express.Router();
const multer = require('multer');

const uploadImage = require('../imageUpload/imageUplodHelper');
/** 
 * multer product farmer product image
 **/
const multerUpload = multer({
storage: multer.memoryStorage()})

const User = require('../model/user');
const Order = require('../model/order');
// var nodemailer = require('nodemailer')

 
//To fetch all users whose role is farmer
// // localhost:3000/farmer/

/**
 * @swagger
 * /farmer:
 *   get:
 *     tags:
 *       - Farmers
 *     description: Returns all farmers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of farmers
 */
router.get('/', (req, res) => {
    User.find({ 'role': 'farmer' }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all users whose role is farmer: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//To get farmer with farmerid and his details
//localhost:3000/:farmerid/ 
/**
 * @swagger
 * /farmer/5f338c0cbf1676d0edfa3133:
 *   get:
 *     tags:
 *       - Farmers with farmer id
 *     description: Returns single farmer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single farmer
 */
router.get('/:farmerid', (req, res) => {
    User.find({ '_id': req.params.farmerid }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving all farmers by id: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

//To get all products of farmer with farmerid and farmer details
//localhost:3000/:farmerid/_productid 
router.get('/:farmerid/:productid', (req, res) => {
    const farmer_id = req.params.farmerid;
    const product_id = req.params.productid;
    User.find({ '_id': farmer_id, 'product._id':product_id }, ['product'], (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving all Products of farmer: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

// localhost:3000/farmer/_farmerid/add
//<<<<<<< HEAD
//router.post('/farmer/:farmerid/add', multerUpload.single('file'), (req, res) => {
    //console.log(req.body.price)
//=======
/**
 * @swagger
 * /farmer/5f338c0cbf1676d0edfa3133/add:
 *   post:
 *     tags:
 *       - To add products of farmer with farmer id
 *     description: Returns single farmer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Farmer Products
 *         description: Products object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: An array of products are added with farmer id
 */
router.post('/:farmerid/add', (req, res) => {
    console.log('inside');
    const farmer_id = req.params.farmerid;
    const { product_name, product_description, price, quantity, product_image } = req.body  //
    console.log(req.body,farmer_id)

    // try {

        // const ProductData = {
        //     product_name,
        //     product_description,
        //     price,
        //     quantity,
        //     product_image
        // }

        // User.update({ '_id': farmer_id },
        //     { '$push': { 'product': ProductData } },
        //     (err, doc) => {
        //         if (!err) {
        //             res.send(doc);
        //              console.log(doc)
        //         } else {
        //             console.log('Error in Farmer Product addition: ' + JSON.stringify(err, undefined, 2));
        //             next(err);
        //         }

    //         })
    // } catch (e) {
    //     console.log({ message: e });
    //     res.json({ message: e });
    // }

    try {
        const myFile = req.file;
        //console.log(myFile, req.body)
        const price = req.body.price;
        const product_name = req.body.product_name;
        const quantity = req.body.quantity;
        const product_description =req.body.product_description;
    
        uploadImage(myFile).then((imageUrl) => {
          if (imageUrl) {
              console.log(imageUrl, 'url') //#######*****///
            const ProductData = {
                product_name,
                product_description,
                price,
                quantity,
                product_image : imageUrl
            }
    
            User.update({ '_id': farmer_id },
                { '$push': { 'product': ProductData } },
                (err, doc) => {
                    if (!err) {
                        res.send(doc);
                         console.log(doc)
                    } else {
                        console.log('Error in Farmer Product addition: ' + JSON.stringify(err, undefined, 2));
                        next(err);
                           }
                        })
                    }
        })
    }
            
          
         
           
                
      catch (err) {
        res.status(404).send({ msg: err });
      }


});

// localhost:3000/farmer/_id
router.patch('/:farmerid/:productid', (req, res) => {
    const farmer_id = req.params.farmerid
    const product_id = req.params.productid;
    const name = req.body.product_name;
    const description = req.body.product_description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image = req.body.product_image;
    console.log(req.body);

    try {

        User.findOneAndUpdate({ '_id': farmer_id, 'product._id': product_id },
            {
                $set: {
                    'product.$.product_name': name,
                    'product.$.product_description': description,
                    'product.$.price': price,
                    'product.$.quantity': quantity,
                    'product.$.product_image': image,
                }
            },
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
router.delete('/:farmerid/:productid', (req, res) => {
    User.update({ '_id': req.params.farmerid, 'product._id': req.params.productid },
        {
            $pull: {
                'product': { '_id': req.params.productid }
            }
        },
        (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                console.log('Error in Farmer Product Delete: ' + JSON.stringify(err, undefined, 2));
            }
        })

});

//get orders by farmer_id
router.get('/orders/:farmerid', (req, res) => {
    console.log('inside farmer orders');
    const farmer_id = req.params.farmerid;
    console.log(farmer_id);
    Order.find({ 'farmer.id': farmer_id }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all farmers orders: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.patch('/orders/:orderid/:status', (req, res) => {
    const order_id = req.params.orderid;
    const status = req.params.status;
    // console.log(status);

    try {
        Order.findOneAndUpdate({ '_id': order_id },
            {
                $set: {
                    'status': status,
                }
            },
            (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log('Error in status Update: ' + JSON.stringify(err, undefined, 2));
                }
            })
    } catch (e) {
        console.log({ message: e });
        res.json({ message: e });
    }

});




// get an order of a farmer by his id  added by simon
router.get('/orders/farmer/:farmer_id', (req, res) => {
    // console.log(req.params.farmer_id)
    
    const farmer_id = (req.params.farmer_id).toString();
      
    order.find({'farmer.id':farmer_id}, (err, docs) => {
        console.log(docs)
        if (!err) {
           
            res.send(docs);
        } else {
            console.log('Error in Retriving all Orders: ' + JSON.stringify(err, undefined, 2));
        }
    });
});
module.exports = router;