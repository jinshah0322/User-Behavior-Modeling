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
    phonenumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    postalcode:{
        type: String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);