# Spotify Clone Back-end

## API End-points

- `GET /` : serves this README.
- `GET /v1/music` : serves all songs from database as JSON. Each song has id, name, artist, cover, location properties.
- `GET /v1/music/:id` : serves the song with given id.
- `POST /v1/music/new` : registers a new song and pushes it to database.

## Instructions

- Clone this repo (no sh\*t)
- Set `MONGO_URL` environment variable to your Mongo DB url. You can export it through terminal or set it via .env file.
- `yarn dev` to start the app with nodemon.
- Make your changes! (and open a PR?)
- `yarn serve` to start the app in production mode.

### Guest Account

- **Email:** _guest@guest.com_
- **Password:** _guestguest_

## Copyright

Track: Time To Talk - Time To Talk ft. George Michel [NCS Release]  
Music provided by NoCopyrightSounds.  
Watch: https://youtu.be/56cURJQVAw0  
Free Download / Stream: http://ncs.io/TTT

Track: Rival - Be Gone (ft. Caravn) [NCS Release]  
Music provided by NoCopyrightSounds.  
Watch: https://youtu.be/p4M3Gle4NQ4  
Free Download / Stream: http://ncs.io/BeGone

Track: Diamond Eyes - 23 [NCS Release]  
Music provided by NoCopyrightSounds.  
Watch: https://youtu.be/Sxcqo4iQwzc  
Free Download / Stream: http://ncs.io/D23

Track: Diviners - Stockholm Lights [NCS Release]  
Music provided by NoCopyrightSounds.  
Watch: https://youtu.be/_Bs2dUtjDSI  
Free Download / Stream: http://ncs.io/StockholmLights

Track: Ascence - Without You [NCS Release]  
Music provided by NoCopyrightSounds.  
Watch: https://youtu.be/aRWKi18SuHk  
Free Download / Stream: http://ncs.io/WithoutYouA

Track: Oneeva - Platform 9 [NCS Release]  
Music provided by NoCopyrightSounds.  
Watch: https://youtu.be/exV_Sf_Afso  
Free Download / Stream: http://ncs.io/Platform9Cr

**ALL END-POINTS' BEHAVIORS ARE SUBJECT TO CHANGE.**

**You can get app itself [here](https://github.com/iakindev/spotify-clone)**
