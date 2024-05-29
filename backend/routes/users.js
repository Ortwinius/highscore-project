var express = require('express');
var router = express.Router();

var db = require('../db/db.js'); 

/* GET users listing. */
router.post('/', function(req, res, next) {

  console.log(JSON.stringify(req.body));
  
  const username = req.body.email;
  const password = req.body.password;

  console.log("test: "+username+password);
  signUpSuccess=db.signup(username, password);

  if(signUpSuccess)
  {
    let credentials=db.login(username, password);
    
    res.status(200).json({
      message: "Successfully registered user",
      token: credentials.token
    })
  } 
  else{
    res.status(409).json({
      message: "User already exists"
    })
  }
});

module.exports = router;
