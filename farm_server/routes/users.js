require('dotenv').config();

var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const verifyToken = require('../middlewares/verifyToken');

const saltRounds = 10;

router.post('/signup', async (req, res)=> {
    const f_name = req.body.first_name;
    const l_name = req.body.last_name; 

    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const address = req.body.address;
    const product = req.body.product;
    const reputation = req.body.reputation;

    try{
        const hashedPw = await bcrypt.hash(password, saltRounds);
    
        const newAccount = {first_name: f_name, last_name: l_name, email: email, 
                            password: hashedPw, role: role, address:address, reputation:reputation, product:product};
        const account = new User(newAccount);

        await account.save();
        console.log(newAccount);
        res.json({message: 'Account created successfully'});

    } catch(e) {

        console.log({message: e});
        res.json({message: e});
    }
})

router.post('/login', async(req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  try {
      const acct = await User.findOne({email: email});
      if(!acct) {
          return res.status(401).json({message: "Email not found!"});
      }

      const match = await bcrypt.compare(password, acct.password);
      if(!match){
          return res.status(401).json({message: "Incorrect Password!"});
      }

      const payload = {id: acct._id, first_name: acct.first_name, last_name: acct.last_name, email: acct.email, role: acct.role};
      const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"});
      
      res.status(200).json({token: token});

  } catch(err) {

      res.json({message: err});
  }
});

router.get('/userdata', verifyToken, async (req, res) => {

    console.log(req.body.tokenData);
    return res.status(200).json(req.body.tokenData);
})

module.exports = router;
