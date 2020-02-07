const db = require("mongoose");

const usersSchema = db.Schema({
  id: {
    type: Number,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
      type: String,
      require: true
  },
  creationDate: {
    type: Date,
    require: true
  }
});

module.exports = db.model("users", usersSchema);
