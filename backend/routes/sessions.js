var express = require('express');
var router = express.Router();

const db = require('../db/db.js'); 

// middlware to check if authtoken is valid
const verifyAuthToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const user = db.getAuthUser(token);
  if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  req.user = user; 
  next();
};

router.post('/', (req, res) => {

    console.log(JSON.stringify(req.body))

    const email = req.body.email;
    const password = req.body.password;

    let credentials = db.login(email, password);

    if(credentials)
    {
      res.status(200).json({
        message: 'Login successful',
        token: credentials.token
      });
    }
    else{
      res.status(401).json({
        message: 'Invalid username or password'
      })
    }
});

// to delete user auth token
router.delete('/', verifyAuthToken, (req, res) => {
  const token = req.headers['authorization'];
  db.deleteToken(token);
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
