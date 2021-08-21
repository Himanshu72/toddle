var { graphql, buildSchema } = require('graphql');
const utility=require('../DB/utility');
let schema = buildSchema(`
  type Query {
        createAssignment(publishAt:String!,description:String!,deadLine:String!,createdBy:String!,students:[String]!):Assignment
        updateAssignment(_id:String!,description:String,deadLine:String,createdBy:String,students:[String]):Assignment
        deleteAssignment(_id:String!):Message
        getAssignment(filter:String,username:String!,isStudent:Boolean!):[Assignment]
    }
   type Assignment{
      description:String
      students:[String]
      publishAT:String
      deadLine:String
      createdBy:String 
      status:String
      _id:String
   } 

   type Message{
       message:String
   }

`);

function getAssignmentStatus(publishAt,deadLine){
    let curDate=new Date().getTime();
    publishAt= publishAt.getTime();
    deadLine=deadLine.getTime();
    
    if(curDate >publishAt ){
        return "ONGOING"
   }else{
        return "SHEDULED"
   }
}

let resolver = { 
                     createAssignment:async (args)=>{
                        try{
                            args.pusblishAt=new Date(args.publishAt);
                            args.deadLine=new Date(args.deadLine);
                        let data=await utility.insertAssignment(args);
                        data.status=getAssignmentStatus(data.publishAt,data.deadLine);
                        return data;
                        }catch(e){
                            console.log(e);
                            throw e;
                        }
                    },
                    updateAssignment:async (args)=>{
                        try{
                        let data=await utility.updateAssignment(args);
                        
                        data.status=getAssignmentStatus(data.publishAt,data.deadLine);
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
                                try{
                                    let data=await utility.getStudentAssignment(args);
                                    for(let a of data){
                                        a.status=getAssignmentStatus(a.publishAt,a.deadLine);
                                    }
                                    if(args.filter){
                                        data=data.filter( (cur)=>{
                                            return cur.status==args.filter;
                                        })
                                    }
                                    return data;
                                }catch(e){
                                    throw e;
                                }
                            }else{
                              try{
                                     let data=await utility.getAllTeacherAssignment(args);
                                     for(let a of data){
                                        a.status=getAssignmentStatus(a.publishAt,a.deadLine);
                                        }
                                        if(args.filter){
                                            data=data.filter( (cur)=>{
                                                return cur.status==args.filter;
                                            })
                                        }
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