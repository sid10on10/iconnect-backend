var express = require('express');
var router = express.Router();
var {url,mongodClient} = require("../config")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// use POST method to login user
router.post('/', async function(req, res, next) {
    let client;
    try{
        client = await mongodClient.connect(url)
        let db = client.db("iconnect")
        
        let user = await db.collection("users").findOne({email:req.body.email})
        //console.log(user)
        // if user exists with given email
        if(user){
            // compare with stored password
            let result  = await bcryptjs.compare(req.body.password,user.password)
            if(result){
                // if it is true login user
                let token = jwt.sign({id:user._id},"abcdefghijklmnopqrs")
                // can set token in cookie
                //res.cookie('token', token, { httpOnly: true })
                res.status(200).json({
                    message:"Login Successfull",
                    token
                })
            }else{
                // password is incorrect
                res.json({
                    message:"Password Incorrect"
                })
            }
        }else{
            // if user is not registered with that email
            res.json({
                message:"No User Found with the Email"
            })
            client.close()
        }
        client.close()
        
        res.end()
    }catch(error){
        client.close()
        console.log(error)
    }
});

module.exports = router;
