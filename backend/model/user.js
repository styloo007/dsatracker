const mongoose = require('mongoose');

const user=mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    username:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    phone_number:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    passwordc:{
        type:"String",
        required:true
    },
    Skills:[{
        type:"String",
    }],
    Admin:{
        type:"String",
        default:false
    },
    moderator:{
        type:"String",
        default:false
    },
    Favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }]
})

const usermodel=mongoose.model('user',user)

module.exports=usermodel

