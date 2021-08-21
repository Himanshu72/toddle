var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const resolver=require("./resolver");
const jwt = require("./jwt");
var schema = buildSchema(`
type Query {
    createuser(username:String!,password:String!,isStudent:Boolean!):user 
    getuser(username:String!,password:String!):user
  }

  type user{
      username:String   
      password:String
      isStudent:Boolean
      token:String
  }
  
`);

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
            
            return data;
        },
        async getuser(args){
            try{
             let data= await resolver.getuser(args);
             return data; 
            }catch(e){
            
              throw e;
            }
        }
};

var app = express();
var cors = require('cors')
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000, () => console.log('Api Gatway is running...'));