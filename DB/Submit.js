const mongoose = require("mongoose");
const  Schema = mongoose.Schema;
let Submit= new Schema({
    _id:{type:String}, // consist of username+assignment
    remark:{type:String,require:true},
    submitedBy:{type:String,require:true},
    Assignment:{type:String,require:true}
});

module.exports=Submit;