var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const {schema,resolver}=require("./graphQL/schema");
var cors = require('cors');
var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));
app.listen(process.env.PORT || '4001', () => console.log('Assignment EndPoint Runing...'));