const express = require("express");
const db = require("mongoose");
const app = express();
const port = process.env.PORT || 3500;
require("dotenv/config");

const musicRouter = require('./routes/musicReq');
const music = require("./models/music");

db.connect(process.env.dbAddress, {useNewUrlParser: true}, () => {
  console.log('Connected to database!!!');
});
app.use("/assets", express.static(__dirname + "/assets"));

app.use("/api", musicRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));