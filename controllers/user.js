const User = require('../models/user')
const jwt = require('jsonwebtoken') // use for token
const express = require('express-jwt') // use for authorization check

const { errorHandler} = require('../helpers/dbErrorHandler')
const user = require('../models/user')


exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err:errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
}



exports.signin = (req, res) => {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({ email }, (err, user) => {

        if(err || !user){
            return res.status(400).json({
                err:"user with that email does not exist. Please signup."
            });
        }

        // if user is find make sure the email and password;
        //cretae authenticate method user model

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email and password not match"
            });
        }
        // generate a signed token with user id and token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //persest the token as 't' expire date 

        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend client 
        const {_id, name, email, role} =user;
        return res.json({token, user:{_id, name, email, role}});

    } );
};

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message:'Signout successful'})

}

