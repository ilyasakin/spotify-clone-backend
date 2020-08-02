import { Router } from 'express';
import MusicModel from '../models/music';

const router = Router();

router.get('/music', async (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const music = await MusicModel.find();
    // SOURCE: https://stackoverflow.com/a/46545530
    const shuffledMusic = music
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    res.json(shuffledMusic);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/music/lenght', (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  MusicModel.countDocuments({}, (_err, count) => {
    res.send(String(count));
  });
});

router.get('/music/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const musicRequest = await MusicModel.find({ id: req.params.id });
  res.json(musicRequest);
});

router.post('/music/new', async (req, res) => {
  const music = new MusicModel({
    id: req.body.id,
    name: req.body.name,
    artist: req.body.artist,
    cover: req.body.cover,
    location: req.body.location,
  });
  try {
    const savedMusic = await music.save();
    res.json(savedMusic);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
