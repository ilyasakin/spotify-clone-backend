import { Schema, model } from 'mongoose';

const usersSchema = Schema({
  id: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  creationDate: {
    type: Date,
    require: true,
  },
});

export default model('users', usersSchema);
