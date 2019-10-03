const db = require('mongoose');

const musicSchema = db.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    artist: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    }
});

module.exports = db.model('music', musicSchema);