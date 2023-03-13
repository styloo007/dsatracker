const mongoose = require('mongoose');

const Solved=mongoose.Schema({
    username:{
        type:'String',
        required:true
    },
    solved: [{problem:{ type: mongoose.Schema.Types.ObjectId, ref: 'problem' },time:{type:"String",required:true},date:{type:"String",required:true}}]


})

const Solvedmmodel=mongoose.model('Solved',Solved)

module.exports=Solvedmmodel