const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name:{
        type :String,
        required :true,
        trim :true
    },
    email :{
        type : String,
        trim : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('email is invaliid')
            }
        }
    },
    phoneNumber:{
        type : String,
        require : true,
        validate(value){
             var phoneNum = /(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
            if(!value.match(phoneNum) ){
                throw new Error ('phone number is not valid');
            }
        }
    },
    DOB:{
        type:Date,
        require :true
    }
})

const User = mongoose.model('Euser',userSchema);
module.exports = User;