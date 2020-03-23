const express = require("express");
const graphQlHttp = require("express-graphql");
const mongoose = require("mongoose");
const isAuth = require('./middleware/is-auth')

const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
/**
 * this will run on each request
 * this route doesn't throw any error it just indicates if the user is autenticated or not
 * thats what we do in graphql
 */
app.use(isAuth)


app.use(
  "/graphql",
  graphQlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`your are listening at the port ${port}`)
    );
  })
  .catch(e => console.log(`No No No ${e.message} `));

// [String!]! this means that a list can be empty but not a list on nulls
// events: [String!]! in query the right side is the type and the left side is the return
