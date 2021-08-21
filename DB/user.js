const mongoose = require("mongoose");
const  Schema = mongoose.Schema;
let user= new Schema({
    _id:{type:String,require:true},
    password:{type:String,require:true},
    isStudent:{type:Boolean,require:true}
});

module.exports=user;