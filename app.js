const express = require("express");
const db = require("mongoose");
const app = express();
const port = process.env.PORT || 3500;
const bodyParser = require("body-parser");
const atob = require("atob");
require("dotenv/config");

const musicRouter = require("./routes/musicReq");

const decode = atob(process.env.MONGO_URL);
db.connect(decode, { useNewUrlParser: true }, () => {
  console.log("Connected to database!!!");
});

app.use(bodyParser.json());

app.use("/assets", express.static(__dirname + "/assets"));

app.use("/api", musicRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));
