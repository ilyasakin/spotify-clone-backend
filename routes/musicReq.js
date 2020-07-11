const app = require("express");
const router = app.Router();
const musicModel = require("../models/music");

router.get("/music", async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const musics = await musicModel.find();
    res.json(musics);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/music/lenght", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  musicModel.countDocuments({} ,function(err, count) {
    res.send(String(count));
  });
});

router.get("/music/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
    const musicRequest = await musicModel.find({ id: req.params.id });
    res.json(musicRequest);
});

router.post("/postTest", async (req, res) => {
  const music = new musicModel({
    id: req.body.id,
    name: req.body.name,
    artist: req.body.artist,
    cover: req.body.cover,
    location: req.body.location
  });
  try {
    const savedMusic = await music.save();
    res.json(savedMusic);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
