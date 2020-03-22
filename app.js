const express = require("express");
const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Event = require("./models/event");
const User = require("./models/user");

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

            type User {
                _id: ID!
                username: String!
                email: String!
                password: String
            }

            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String!
            } 

            input UserInput {
              username: String!
              email: String!
              password: String
          } 
    
            type RootQuery {
                events: [Event!]!
            }
    
            type RootMutation {
                createEvent(eventInput: EventInput!): Event
                createUser(userInput: UserInput!): User
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
      },
      createUser: async args => {
        try {
          const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
          const user = new User({
            username: args.userInput.username,
            email: args.userInput.email,
            password: hashedPassword
          });
          console.log(user);
          user.save();
          return user;
        } catch (e) {
          throw e.message;
        }
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
