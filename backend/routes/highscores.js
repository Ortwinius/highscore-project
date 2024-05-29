const express = require('express');
const router = express.Router();

const db = require('../db/db.js');

// Middleware for auth token validation
const verifyAuthToken = (req, res, next) => {
    const token = req.headers['authorization']; // get auth token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const user = db.getAuthUser(token);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    // add user to req
    req.user = user; 
    next();
};

// send username and highscore to db
router.post('/', verifyAuthToken, (req, res) => {
    const username = req.body.username;
    const score = req.body.score;

    console.log("Username: " + username + " Score: " + score);

    if(!username || score == undefined){
        return res.status(401).json({ message: 'Error: User data invalid' });
    }

    db.addHighscore(username,score);

    res.status(201).json({ message: 'Highscore submitted' });
});

// to retrieve highscore lists
router.get('/', verifyAuthToken, (req,res) => {
    const highscores = db.getHighscores();
    res.status(200).json(highscores);
});

module.exports = router;