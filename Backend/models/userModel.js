const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);