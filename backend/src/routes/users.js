var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

router.post('/', async function(req, res, next) {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword});
    newUser.generateRandomToken();
    await newUser.save();

    res.status(200).json({
      message: "Successfully registered user",
      token: newUser.token
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
