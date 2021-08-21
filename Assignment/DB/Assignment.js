const mongoose = require("mongoose");
const  Schema = mongoose.Schema;
let Assignment= new Schema({
    description:{type:String,require:true},
    students:[{type:String}],
     postedAt:{type:Date,require:true},
     deadLine:{type:Date,require:true},
     createdBy:{type:String,require:true}
});

module.exports=Assignment;