import { Schema, model } from 'mongoose';

const PlaylistSchema = Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },
  list: {
    type: [Number],
    require: true,
  },
});

export default model('playlist', PlaylistSchema);
