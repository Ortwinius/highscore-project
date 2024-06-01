const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',        
        required: true
    }
})

module.exports = mongoose.model('Highscore', Highscore);