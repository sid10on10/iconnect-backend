var express = require('express');
var router = express.Router();
var {url,mongodClient} = require("../config")
const bcryptjs = require("bcryptjs");

/* GET signUp */
router.get('/', function(req, res, next) {
  res.write("<h1>SignUp page! Use POST method to Sign up Users</h1>");
  res.end()
});

// POST method to register users
router.post('/', async function(req, res, next) {
  let client;
  try{
    client = await mongodClient.connect(url)
    // database to use
    let db = client.db("iconnect")
    let {name,email,password} = req.body
    // use users collection of database
    let user = await db.collection("users").findOne({email: email});
    if(user){
      // user with this email already exists
      res.json({
        message:"User already Exist Kindly Login"
      })
    }else{
      // if not create a user with given email
      let salt = await bcryptjs.genSalt(10)
      let hash = await bcryptjs.hash(password,salt)
      password = hash
      // updating user into mongodb
      await db.collection("users").insertOne({name,email,password})
      // signUp successfull user is created
      res.json({
          message:"SignUp Successful You can now login"
      })
      client.close()
    }
  }catch(error){
    client.close()
    console.log(error)
  }
  });

module.exports = router;
