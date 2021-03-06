const mongoose = require("mongoose");
const { obj } = require("../DB/Assignment");
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
            console.log(obj);
          const AssignmentData=new AssignmentModel(obj);
          const data= await AssignmentData.save();
          return data;
        } catch(e){
            console.log(e);
            throw e;
        }
    },
    updateAssignment:async(obj)=>{
        try{ 
        let data=await AssignmentModel.findOneAndUpdate({_id:obj._id},obj,{new:true});
        return data;
        }catch(e){
            console.log(e);
            throw e;
        }
    },
    deleteAssignment:async(obj)=>{
          try{
                let data=await AssignmentModel.deleteOne({_id:obj._id});
                console.log(data);
                return data;
          }catch(e){
              throw e;
          } 
    },getAllTeacherAssignment:async(obj)=>{
        try{
         let data=await AssignmentModel.find({createdBy:obj.username});
            return data;
        }catch(e){
            throw e;
        }
    },
    getStudentAssignment:async(obj)=>{
        try{
            let data=await AssignmentModel.find({ students:{$all:[obj.username]} });
            return data;
        } catch(e){ 
            throw e;
        }  
    },
    async insertSubmission(obj){
        try{
            let submitData=submitModel(obj);
            let data =await submitData.save();
             return data;   
        }catch(e){
            throw e;
        }
    },
   
        async getAllStudentSubmission(username){
            try{
                let data= await submitModel.find({submitedBy:username});
                return data;
            }catch(e){
                console.log(e);
                throw e;
            }
        }, 
     async  getALlSubmissionOfStudent(Assignment){
        try{
            let data= submitModel.find({Assignment:Assignment});
            return data;
        }catch(e){
            console.log(e);
            throw e;
        }
     },

     async getAssignmentSubmmistionStudent(obj){
        try{
        let data= await submitModel.findOne({_id:obj.username+obj.Assignment});  
        return data;
    }catch(e){
            throw e;
        }
     },
     async getAssignmentSubmmistionTutor(obj){
        try{
            let data=await submitModel.find({submitedBy:obj.username,Assignment:obj.Assignment});
            return data;
        }catch(e){
            throw e;
        }
     },
     

   }