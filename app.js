const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("HELLO WORLD");
});

app.listen(port, () => `your are listening at the port ${port}`);
