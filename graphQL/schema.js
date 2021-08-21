var { graphql, buildSchema } = require('graphql');
const utility=require('../DB/utility');
let schema = buildSchema(`
  type Query {
        createAssignment:Assignment
    }
   type Assignment{
      description:String
      students:[String]
      postedAt:String
      deadLine:String
      createdBy:String 
   } 

`);

let resolver = { 
                    createAssignment:()=>{
                            return "hello"
                    }
                };
module.exports={
    schema:schema,
    resolver:resolver
}     