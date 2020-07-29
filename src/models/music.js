import { Schema, model } from 'mongoose';

const musicSchema = Schema({
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  artist: {
    type: String,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
});

export default model('music', musicSchema);
