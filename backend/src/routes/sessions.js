var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var bcrypt=require('bcrypt');

// login user
router.post('/', async function(req, res, next) {

  try {
    const {email, password}=req.body;

    const userToLogin = await User.findOne({ email });
    if (!userToLogin || !(await bcrypt.compare(password, userToLogin.password))) {
      res.status(401).json({
        message: 'Invalid email or password'
      })
    }
    else{
      const token=userToLogin.generateRandomToken();
      console.log(userToLogin);
      await userToLogin.save();

      res.status(200).json({
        message: "Login successful",
        token: token
      })
    }
  } catch (error) {
    throw error;
  }
});

// logout user
router.delete('/', async function(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(404).json({
      message: 'authToken not initialized'
    });
  }

  // parse token from json
  const authToken = authHeader.split(' ')[1];

  try {
    // Find the user by authToken
    const user = await User.getAuthenticatedUser(authToken);
    if (!user) {
      console.log("User undefined");
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Remove token
    user.token = undefined;
    await user.save();

    res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;