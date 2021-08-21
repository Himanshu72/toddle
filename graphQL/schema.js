var { graphql, buildSchema } = require('graphql');
const utility=require('../DB/utility');
let schema = buildSchema(`
  type Query {
        createAssignment(description:String!,deadLine:String!,createdBy:String!,students:[String]!):Assignment
        updateAssignment(_id:String!,description:String,deadLine:String,createdBy:String,students:[String]):Assignment
        deleteAssignment(_id:String!):Message
        getAssignment(username:String,isStudent:Boolean):[Assignment]
    }
   type Assignment{
      description:String
      students:[String]
      postedAt:String
      deadLine:String
      createdBy:String 
      status:String
      _id:String
   } 

   type Message{
       message:String
   }

`);

let resolver = { 
                     createAssignment:async (args)=>{
                        try{
                            args.postedAt=new Date();
                            args.deadLine=new Date();
                        let data=await utility.insertAssignment(args);
                        return data;
                        }catch(e){
                            console.log(e);
                            throw e;
                        }
                    },
                    updateAssignment:async (args)=>{
                        try{
                        let data=await utility.updateAssignment(args);
                        return data;
                        }catch(e){
                            throw e;
                        }
                    },
                    deleteAssignment: async(args)=>{
                        try{
                            let data=await utility.deleteAssignment(args);
                            if(data.deletedCount==1)
                                    return {message:"Sucessfully Deleted"}
                            return {message:"Invalid ID"};
                        }catch(e){
                            throw e;
                        }
                    },
                    getAssignment:async (args)=>{
                            if(args.isStudent){

                            }else{
                              try{
                                     let data=await utility.getAllTeacherAssignment(args);
                                     return data;
                                }catch(e){
                                    throw e;
                                }
                            }
                  }
                };
module.exports={
    schema:schema,
    resolver:resolver
}     