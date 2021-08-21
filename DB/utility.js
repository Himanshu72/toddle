const mongoose = require("mongoose");
const Assignment=require("../DB/Assignment");
const Submit=require("../DB/Submit");
const env=require("../env");

//DB connection
mongoose.connect(env.dbserver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  var db = mongoose.connection;
  
  db.on("error", console.error.bind(console, "connection error:"));
  const AssignmentModel=mongoose.model("Assignments",Assignment);
  const submitModel=mongoose.model("Submissions",Submit);
   module.exports={
    insertAssignment:async (obj)=>{
        try{
            
          const AssignmentData=new AssignmentModel(obj);
          const data= await AssignmentData.save();
          return data;
        } catch(e){
            console.log(e);
            throw e;
        }
}
   }