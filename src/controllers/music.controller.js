import { v4 as uuidv4 } from 'uuid';
import Music from '../models/Music.model';

const getAll = async (_req, res) => {
  try {
    const music = await Music.find();
    // SOURCE: https://stackoverflow.com/a/46545530
    const shuffledMusic = music
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    res.json(shuffledMusic);
  } catch (err) {
    res.json({ message: err });
  }
};

const getById = async (req, res) => {
  const musicRequest = await Music.find({ id: req.params.id });
  res.json(musicRequest);
};

const getCount = async (_req, res) => {
  try {
    const count = await Music.countDocuments({});
    res.status(200).send(count.toString());
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteById = async (req, res) => {
  await Music.findOneAndDelete({ id: req.params.id });
  res.sendStatus(200);
};

const update = async (req, res) => {
  if (!req.update) {
    res.status(400).send('No update key found on body');
    return;
  }
  // eslint-disable-next-line no-underscore-dangle
  const updated = await Music.findByIdAndUpdate(req.body._id, { ...req.body.update });
  res.send(updated);
};

const create = async (req, res) => {
  try {
    const music = new Music({
      id: uuidv4(),
      name: req.body.name,
      artist: req.body.artist,
      cover: req.body.cover,
      location: req.body.location,
    });
    const savedMusic = await music.save();
    res.json(savedMusic);
  } catch (error) {
    res.status(500).send(error);
  }
};

const search = async (req, res) => {
  const { query } = req.params;
  try {
    const result = await Music.find({ name: { $regex: query, $options: 'i' } }).limit(10);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getLiked = async (req, res) => {
  const { likedSongs } = req.user;
  const songs = await Music.find({ id: { $in: likedSongs } });
  res.send(songs);
};

export default { getAll, getById, getCount, getLiked, deleteById, update, create, search };
