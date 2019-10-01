const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

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
app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/andelevandens", (req, res) => {
  res.send("Ay nid a van dens");
});

app.get("/api/music/lenght", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(String(songs.length));
});

app.get("/api/music/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const music = songs.find(m => m.id === parseInt(req.params.id));
  if (!songs) res.status(404).send("Verilen id'de şarkı bulunamadı");
  res.send(music);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
