const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highscoreListSchema = new Schema({
    sessionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'Highscore'
    }]
})

module.exports = mongoose.model('HighscoreList', highscoreListSchema);