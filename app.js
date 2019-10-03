const express = require("express");
const db = require("mongoose");
const app = express();
const port = process.env.PORT || 3500;
const bodyParser = require("body-parser");
require("dotenv/config");

const musicRouter = require("./routes/musicReq");

db.connect(process.env.dbAddress, { useNewUrlParser: true }, () => {
  console.log("Connected to database!!!");
});

app.use(bodyParser.json());

app.use("/assets", express.static(__dirname + "/assets"));

app.use("/api", musicRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));
