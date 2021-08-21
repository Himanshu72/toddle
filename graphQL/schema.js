var { graphql, buildSchema } = require('graphql');
const utility=require('../DB/utility');
let schema = buildSchema(`
  type Query {
    user(username:String!,password:String!,isStudent:Boolean!):user 
    getUser(username:String,password:String):user
  }

  type user{
      username:String   
      password:String
      isStudent:Boolean
  }
`);

let resolver = { 
            user: async function (args) {
                
               
                try{
                    const obj=await utility.insertUser(args);
                        console.log(obj);
                    return obj;
                }catch(e){
                    throw e;
                  }     
                
                
            },
            async getUser(args){
              try{
                let data=utility.getUser(args);
                return data;
              }catch(e){
                throw e;
              }
            }
     };
module.exports={
    schema:schema,
    resolver:resolver
}     