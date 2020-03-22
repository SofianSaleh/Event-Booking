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
        type Event {
            _id: ID!
            name: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]!
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
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(port, () => console.log(`your are listening at the port ${port}`));

// [String!]! this means that a list can be empty but not a list on nulls
// events: [String!]! in query the right side is the type and the left side is the return
