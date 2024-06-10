const express = require('express');
const router = express.Router();
const Highscore = require('../models/highscore.js');
const User = require('../models/user.js');

// for adding new highscore to highscore list
router.post('/', async function(req, res, next) {
    const { username, score } = req.body;
  
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: Authentication token not provided' });
    }

    const authToken = authHeader.split(' ')[1];
    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized: Authentication token not provided' });
    }
  
    try {
        // Check if user is authenticated
        const user = await User.findOne({ token: authToken });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not logged in' });
        }

        // Insert highscore into the database
        const newHighscore = new Highscore({
            userId: user._id,
            username: username,
            score: score
        });
        await newHighscore.save();

        res.status(200).json({ message: 'Score added successfully' });
    } catch (error) {
        next(error);
    }
});

// returns highscore list
router.get('/', async function(req, res, next) {
    //const { authToken } = req.body;
    
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      console.log("Authorization header missing");
      return res.status(404).json({
        message: 'authToken not initialized'
      });
    }
    const authToken = authHeader.split(' ')[1];
  
    if (!authToken) {
        console.log("AuthToken: ", authToken);
        return res.status(401).json({ message: 'Unauthorized: Authentication token not provided' });
    }
  
    try {
        // Check if user is authenticated
        const user = await User.findOne({ token: authToken });
        if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not logged in' });
        }

        const highScores = await Highscore.find({ userId: user._id });

        // returns highScores as json object
        res.status(200).json(highScores);
    } catch (error) {
        next(error);
    }
});

module.exports = router;