const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {schema,resolver}=require("./graphQL/schema");
const app = express();
var cors = require('cors')
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue:resolver,
    graphiql: true,
    
  }),
);

app.listen(4000,()=>{
    console.log("Auth Service Running");
});