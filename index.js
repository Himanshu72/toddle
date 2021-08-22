var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const resolver=require("./resolver");
const jwt = require("./jwt");

var schema = buildSchema(`
type Query {
    createuser(username:String!,password:String!,isStudent:Boolean!):user 
    getuser(username:String!,password:String!):user
    createAssignment(token:String!,username:String!,publishAt:String!,description:String!,deadLine:String!,createdBy:String!,students:[String]!):Assignment
    updateAssignment(token:String!,username:String!,_id:String!,description:String,deadLine:String,createdBy:String,students:[String]):Assignment
    deleteAssignment(token:String!,username:String!,_id:String!):Message
    submitAssignment(token:String!,username:String!,remark:String!,submitedBy:String!,Assignment:String!):Submit
    getAssignment(token:String!,username:String!,filter:String):[Assignment]
    getAssignmentSubmission(token:String!,username:String!,Assignment:String!):[Submit]
  }

  type Assignment{
    description:String
    students:[String]
    publishAt:String
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

  type user{
      username:String   
      password:String
      isStudent:Boolean
      token:String
  }
  
`);


let cache={};
var root = { 
        createuser:async(args)=>{
            let data;   
            try{
              data= await resolver.createuser(args);
              if(data.username){
                data.token=jwt.assignToken(data.username);
            }  
            }catch(e){
              console.log(e);
                throw new Error("Invalid Input");
            }
            cache[data.username]=data;
            return data;
        },
        async getuser(args){
            try{
             let data= await resolver.getuser(args);
             cache[data.username]=data;
            
             return data; 
            }catch(e){
            
              throw e;
            }
        },
        createAssignment:async (args)=>{
          try{    
           
            
            
          if(jwt.isAuth(args.username,args.token)==false){
                    throw new Error("Invalid Token");
              }else{
                  if(cache[args.username].isStudent ){
                    throw new Error("Access Denied...");
                  } else{

                    let data = await resolver.createAssignment(args);
                       return data;   
                  }  

              }
        } 
        catch(e)
        {
          throw e;
        }
      },
      async updateAssignment(args){
        try{    
          
        

          if(jwt.isAuth(args.username,args.token)==false){
                    throw new Error("Invalid Token");
              }else{
                  if(cache[args.username].isStudent ){
                    throw new Error("Access Denied...");
                  } else{

                    let data = await resolver.updateAssignment(args);
                       return data;   
                  }  

              }
        } 
        catch(e)
        {
          throw e;
        }
      },
      async deleteAssignment(args){
        try{    
             
          if(jwt.isAuth(args.username,args.token)==false){
                    throw new Error("Invalid Token");
              }else{
                  if(cache[args.username].isStudent ){
                    throw new Error("Access Denied...");
                  } else{

                    let data = await resolver.deleteAssignment(args);
                       return data;   
                  }  

              }
        } 
        catch(e)
        {
          throw e;
        }
      },
      async submitAssignment(args){
        try{    
             
          if(jwt.isAuth(args.username,args.token)==false){
                    throw new Error("Invalid Token");
              }else{
                  if(cache[args.username].isStudent ){
                    throw new Error("Access Denied...");
                  } else{

                    let data = await resolver.deleteAssignment(args);
                       return data;   
                  }  

              }
        } 
        catch(e)
        {
          throw e;
        }
      },
      async submitAssignment(args){
        try{    
          
          if(jwt.isAuth(args.username,args.token)==false){
                    throw new Error("Invalid Token");
              }else{
                  if(!cache[args.username].isStudent ){
                    throw new Error("Access Denied...");
                  } else{
                    let data = await resolver.submitAssignment(args);
                       return data;   
                  }  

              }
        } 
        catch(e)
        {
          throw e;
        }
      },
      async getAssignmentSubmission(args){
        try{    
            
          if(jwt.isAuth(args.username,args.token)==false){
                    throw new Error("Invalid Token");
              }else{
                    args.isStudent=cache[args.username].isStudent;        
                    let data = await resolver.getAssignmentSubmission(args);
                       return data;   
                  
              }
        } 
        catch(e)
        {
          throw e;
        }
      },
      async  getAssignment(args){
        try{    
         
          if(jwt.isAuth(args.username,args.token)==false){
                    throw new Error("Invalid Token");
              }else{
                    args.isStudent=cache[args.username].isStudent;        
                    let data = await resolver.getAssignment(args,args.filter);
                       return data;   
                  
              }
        } 
        catch(e)
        {
          throw e;
        }
               
      }

};

var app = express();
var cors = require('cors');
const { isAuth } = require('./jwt');
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(process.env.PORT || '3000', () => console.log('Api Gatway is running...'));