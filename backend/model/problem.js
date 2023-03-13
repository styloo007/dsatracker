const mongoose = require('mongoose');

const problem=mongoose.Schema({
    username:{
        type:'String',
        required:true
    },
    email:{
        type:'String',
        required:true
    },
    problems:{
        type:'String',
        required:true
    },
    website:{
        type:'String',
        required:true
    },
    link:{
        type:"string",
        required:true
    },
    level:{
        type:"string",
        required:true
    },
    Discussion:[
        {
            username:"String",
            text:"String",
            date:"String",
            time:"String"
        }
    ]

})
const Favorite=mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'problem' }]


})

const favmodel=mongoose.model('Favorite',Favorite)
const problemmodel=mongoose.model('problem',problem)

module.exports={problemmodel,favmodel}