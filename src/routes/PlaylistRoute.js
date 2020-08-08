import { Router } from 'express';
import PlaylistModel from '../models/PlaylistSchema';

const router = Router();

router.get('/playlist', async (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const playlists = await PlaylistModel.find();
    res.json(playlists);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/playlist/new', async (req, res) => {
  const playlist = new PlaylistModel({
    id: req.body.id,
    list: req.body.list,
  });
  try {
    const savedPlaylist = await playlist.save();
    res.json(savedPlaylist);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
