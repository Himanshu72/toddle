const mongoose = require("mongoose");
const user=require("../DB/user");
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
  //Model creation
  const userModel = mongoose.model("users", user);


  module.exports={
      insertUser:async (obj)=>{
              try{
                  obj._id=obj.username;
                const userData=new userModel(obj);
                const data= await userData.save();
                data.username=data._id;
                return data;
              } catch(e){
                  console.log(e);
                  throw e;
              }
      },
      getUser:async (obj)=>{
          try{
            let data=await userModel.findById(obj.username);
              data.username=data._id;
              if(data.password!==obj.password)
                    throw new Error("Invalid Password");
            return data;
          }catch(e){
            throw e;
          }
      }
  }