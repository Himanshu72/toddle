var { graphql, buildSchema } = require('graphql');
const utility=require('../DB/utility');
let schema = buildSchema(`
  type Query {
        createAssignment(publishAt:String!,description:String!,deadLine:String!,createdBy:String!,students:[String]!):Assignment
        updateAssignment(_id:String!,description:String,deadLine:String,createdBy:String,students:[String]):Assignment
        deleteAssignment(_id:String!):Message
        getAssignment(filter:String,username:String!,isStudent:Boolean!):[Assignment]
        submitAssignment(remark:String!,submitedBy:String!,Assignment:String!):Submit
        getAssignmentSubmission(isStudent:Boolean!,username:String!,Assignment:String!):[Submit]
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

   type Submit{
    _id:String
    remark:String
    submitedBy:String
    Assignment:String 
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
function getSubmissionStatus(obj){
    //will do it               
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
                  },
                  async submitAssignment(args){
                    try{
                    args._id=args.submitedBy+args.Assignment;
                    let data=await utility.insertSubmission(args);
                    return data;
                    }catch(e){
                        throw e;
                    }
                  },
                  async  getAssignmentSubmission(args){
                    try{
                        console.log(args);
                        if(args.isStudent){
                          let res=[];
                            let data= await utility.getAssignmentSubmmistionStudent(args);
                          //Add status
                          res.push(data);
                            console.log(data);
                          return res;  
                        }else{
                            let res= await utility.getAssignmentSubmmistionTutor(args);
                            return res;
                        }
                    }catch(e){
                        throw e;
                    }
                  }
                };
module.exports={
    schema:schema,
    resolver:resolver
}     