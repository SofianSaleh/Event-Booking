const express = require("express");
const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const Event = require("./models/event");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphQlHttp({
    schema: buildSchema(`
            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
                date: String!
            }
            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String!
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
      events: async () => {
        try {
          const events = await Event.find();
          return events.map(event => {
            return { ...event._doc };
          });
        } catch (e) {
          throw e.message;
        }
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });
        event.save();
        return event;
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`your are listening at the port ${port}`)
    );
  })
  .catch(e => console.log(`No No No ${e.message} `));

// [String!]! this means that a list can be empty but not a list on nulls
// events: [String!]! in query the right side is the type and the left side is the return
