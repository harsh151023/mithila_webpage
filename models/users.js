const mongoose =require('mongoose');
const userschemas = new mongoose.Schema({

mobile:{
type:String,
required:true
},
name:{
type:String,
required:true
},
description:{
    type:String,
    required:true
    },

});

const users = mongoose.model('Users',userschemas);
module.exports=users;