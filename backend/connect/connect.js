const mongoose = require('mongoose');

const connect = async ()=>
{
    try{
        const con= await mongoose.connect("mongodb://localhost:27017",);
        console.log("connect ")
    }
    catch{
        console.log("unable to connect ")
    }
}

module.exports=connect;