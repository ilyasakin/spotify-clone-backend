const app = require("express");
const router = app.Router();

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


  router.get("/", (req, res) => {
      res.send("damn");
  })
  router.get("/music/lenght", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(String(songs.length));
  });

  router.get("/music/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const music = songs.find(m => m.id === parseInt(req.params.id));
    if (!songs) res.status(404).send("Verilen id'de şarkı bulunamadı");
    res.send(music);
  });
  
  router.post("api/post", (req, res) => {
    console.log(req.body);
  });

  module.exports = router;