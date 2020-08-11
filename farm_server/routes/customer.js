require('dotenv').config();

var express = require('express');
var router = express.Router();

const User = require('../model/user');

//To fetch all users whose role is farmer
// localhost:3000/farmer/
router.get('/customer', (req, res) => {
    User.find({'role':'customer'}, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving all Products: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;