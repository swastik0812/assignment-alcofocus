const express = require('express');
const User = require('../models/user');
const {sendWelcomeEmail}= require('../emails/account');

const router = express.Router();

router.post('/users',async function(req,res){
    const user =new User(req.body)
    try{
       const resp= await user.save();
       sendWelcomeEmail(user.email,user.name)
        res.status(200).send(resp)
    }catch(e){
     res.status(400).send(e);
       
   }
})

router.get('/users/allusers',async function(req,res){
    try{
        const response= await User.find({});
        if(!response[0]){
            res.status(404).send();
        }
        res.status(200).send(response)
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;