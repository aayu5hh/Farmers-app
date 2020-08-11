require('dotenv').config();

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const User = require('../model/user');
const Order = require('../model/order');

//To fetch all users whose role is farmer
// localhost:3000/customer/
router.get('/', (req, res) => {
    User.find({ 'role': 'customer' }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all Products: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//customer to get all products by farmer_id and it will return all products with farmerid
router.get('/:farmerid', (req, res) => {
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
router.post('/orders', async (req, res) => {
    const order_items = req.body.order_items;
    const total_price = req.body.total_price;
    const status = req.body.status;
    const pickup_date = req.body.pickup_date;
    const farmer = req.body.farmer;
    const customer = req.body.customer;
    const farmerEmail = req.body.farmer.email;
    const customerEmail = req.body.customer.email;
    // console.log(farmerEmail);
    // console.log(customerEmail);
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
        // console.log(newOrder);
        res.json({ message: 'Orders are done successfully' });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'navinhelpdesk@gmail.com',
              pass: 'na252pa14'
            }
          });
          
          var mailOptions = {
            from: 'navinhelpdesk@gmail.com',
            to: 'npaudel@miu.edu',
            subject: 'From farmer1 for your order',
            text: 'Thank you, for your order! We will send you mail once it is ready.'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    } catch (e) {

        console.log({ message: e });
        res.json({ message: e });
    }
});

//get orders by customer id
router.get('/orders/:customerid', (req, res) => {
    const customer_id = req.params.customerid;
    console.log(customer_id);
    Order.find({ 'customer.id': customer_id }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all customer orders: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;