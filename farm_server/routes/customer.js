require('dotenv').config();

var express = require('express');
var router = express.Router();

const User = require('../model/user');
const Order = require('../model/order');

//To fetch all users whose role is farmer
// localhost:3000/customer/
router.get('/customer', (req, res) => {
    User.find({ 'role': 'customer' }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all Products: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//customer to get all products by farmer_id and it will return all products with farmerid
router.get('/customer/:farmerid', (req, res) => {
    const farmer_id = req.params.farmerid;
    User.find({ '_id': farmer_id }, ['product'], (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all Products: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//customer add to orders to orders collection
router.post('/customer/orders', async (req, res) => {
    const order_items = req.body.order_items;
    const total_price = req.body.total_price;
    const status = req.body.status;
    const pickup_date = req.body.pickup_date;
    const farmer = req.body.farmer;
    const customer = req.body.customer;
    try {
        const newOrder = {
            order_items: order_items,
            total_price: total_price,
            status: status,
            pickup_date: pickup_date,
            farmer: farmer,
            customer: customer
        };

        const order = new Order(newOrder);

        await order.save();
        console.log(newOrder);
        res.json({ message: 'Orders are done successfully' });

    } catch (e) {

        console.log({ message: e });
        res.json({ message: e });
    }
});


module.exports = router;