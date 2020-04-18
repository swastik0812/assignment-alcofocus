const express = require('express');
const User = require('../models/user');
const multer = require("multer");
const sharp = require("sharp");
const {sendWelcomeEmail}= require('../emails/account');

const router = express.Router();

// router.post('/users',async function(req,res){
//     console.log(req.name);
//     const user =new User(req.body)
//     try{
//        const resp= await user.save();
//        sendWelcomeEmail(user.email,user.name)
//         res.status(200).send(resp)
//     }catch(e){
//      res.status(400).send(e);
       
//    }
// })

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

const uploads= multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
          return cb( new Error('please upload an image'));  

        }
        cb(undefined,true);
    }
})

router.post('/users',uploads.single("photo"),async(req,res)=>{

    const buffer= await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        DOB:req.body.DOB,
        photo:buffer
    })
    try{
         const resp= await user.save();
         sendWelcomeEmail(user.email,user.name)
         res.status(200).send(resp)
       }catch(e){
        res.status(400).send(e);
     }
     res.send();
 },(error,req,res,next)=>{
     res.status(400).send({error:error.message})
 })


module.exports = router;