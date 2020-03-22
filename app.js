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
        schema{
            query:
            mutation
        }
    `),
    rootValue: {}
  })
);

app.listen(port, () => `your are listening at the port ${port}`);
