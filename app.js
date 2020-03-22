const express = require("express");
const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
const events = [];

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
            input EventInput {
                name: String!
                description: String!
                price: Float!
            } 
    
            type RootQuery {
                events: [Event!]!
            }
    
            type RootMutation {
                createEvent(eventInput: EventInput!): Event
            }
    
            schema{
                query: RootQuery
                mutation: RootMutation 
            }
        `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        console.log("---------------------------------------------------");
        const event = {
          _id: Math.floor(Math.random()),
          name: args.eventInput.name,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date().toISOString
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`your are listening at the port ${port}`)
    );
  })
  .catch(e => console.log(`No No No ${e.message} `));

// [String!]! this means that a list can be empty but not a list on nulls
// events: [String!]! in query the right side is the type and the left side is the return
