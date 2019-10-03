const app = require("express");
const router = app.Router();
const musicModel = require("../models/music");

const songs = [
  {
    id: 1,
    name: "To The Light",
    artist: "A.CHAL",
    cover: "assets/images/cover.jpg",
    location: "assets/music/to-the-light.m4a"
  },
  {
    id: 2,
    name: "Echoes",
    artist: "Thomas Azier",
    cover: "assets/images/coverEcho.jpg",
    location: "assets/music/echoes.m4a"
  },
  {
    id: 3,
    name: "Rocket Man",
    artist: "My Morning Jacket",
    cover: "assets/images/coverJacket.jpg",
    location: "assets/music/rocketman.m4a"
  },
  {
    id: 4,
    name: "Space Child",
    artist: "UFO",
    cover: "assets/images/coverUFO.jpg",
    location: "assets/music/spacechild.m4a"
  },
  {
    id: 5,
    name: "Footsteps",
    artist: "Pearl Jam",
    cover: "assets/images/coverFootsteps.jpg",
    location: "assets/music/footsteps.m4a"
  }
];

router.get("/music", async (req, res) => {
  try {
    const musics = await musicModel.find();
    res.json(musics);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/music/lenght", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(String(songs.length));
});

router.get("/music/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const musicRequest = await musicModel.find({ id: req.params.id });
    res.json(musicRequest);
  } catch (err) {
    res.json({ message: err });
  }

  /* const music = songs.find(m => m.id === parseInt(req.params.id));
  if (!songs) res.status(404).send("Verilen id'de şarkı bulunamadı");
   res.send(music); */
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
