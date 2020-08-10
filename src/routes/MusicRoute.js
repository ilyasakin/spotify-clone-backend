import { Router } from 'express';
import MusicModel from '../models/MusicSchema';
import auth from '../middleware/auth';

const router = Router();

router.get('/music', auth, async (_req, res) => {
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

router.get('/music/lenght', auth, (_req, res) => {
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

router.delete('/music/:id', auth, async (req, res) => {
  await MusicModel.findOneAndDelete({ id: req.params.id });
  res.sendStatus(200);
});

router.post('/music/new', auth, async (req, res) => {
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
