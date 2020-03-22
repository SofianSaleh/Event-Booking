const express = require("express");
const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphQlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name:String!): String
        }

        schema{
            query: RootQuery
            mutation: RootMutation 
        }
    `),
    rootValue: {
      events: () => {
        return ["ss", "sssssss"];
      },
      createEvent: () => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(port, () => `your are listening at the port ${port}`);

// [String!]! this means that a list can be empty but not a list on nulls
