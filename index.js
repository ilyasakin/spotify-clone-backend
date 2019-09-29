const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

const songs = [
  { id: 1, name: "To The Light", artist: "A.CHAL", cover: "cover.jpg"},
  { id: 2, name: "Echoes", artist: "Thomas Azier"},
  { id: 3, name: "Rocket Man", artist: "My Morning Jacket" },
  { id: 4, name: "Space Child", artist: "UFO" },
  { id: 5, name: "Footsteps", artist: "Pearl Jam" },


];

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
