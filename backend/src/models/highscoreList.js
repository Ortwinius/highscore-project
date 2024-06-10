const mongoose = require('mongoose');

const highscoreListSchema = new mongoose.Schema({
    gameId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'Highscore'
    }]
})

module.exports = mongoose.model('HighscoreList', highscoreListSchema);