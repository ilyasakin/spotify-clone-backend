# Spotify Clone Back-end

## API End-points

- `GET /` : serves this README.
- `GET /api/music` : serves all songs from database as JSON. Each song has id, name, artist, cover, location properties.
- `GET /api/music/:id` : serves the song with given id.
- `POST /api/music/new` : registers a new song and pushes it to database.

## Instructions

- Clone this repo (no sh\*t)
- Set `MONGO_URL` environment variable to your Mongo DB url. You can export it through terminal or set it via .env file.
- `yarn dev` to start the app with nodemon.
- Make your changes! (and open a PR?)
- `yarn serve` to start the app in production mode.

**ALL END-POINTS' BEHAVIORS ARE SUBJECT TO CHANGE.**

**You can get app itself [here](https://github.com/iakindev/spotify-clone)**
