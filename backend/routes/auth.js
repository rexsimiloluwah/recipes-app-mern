const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middleware/auth');
const User = require('../models/User');
const HttpError = require('../errors/HttpError');

const router = express.Router()

// @route POST /api/auth/login
// @desc Login users.

router.post("/login", (req, res, next) => {
    
    const {email, password} = req.body

    if (!email || !password){
        return res.status(400)
        .json({
            "message" : "Please enter password and email."
        })
    }

    User.findOne({email : email})
    .then( user => {
        if (!user){
            return res.status(400)
            .json({
                "message" : "User does not exist, Please sign in."
            })
        }

        // Validate password using bcrypt.compare
        bcrypt.compare(password, user.password)
        .then( isMatch => {
            if(!isMatch){
                return res.status(400)
                .json({
                    "message" : "Invalid Credentials, Username or Password is incorrect."
                })
            }

            jwt.sign(
                {id : user._id},
                process.env.JWT_SECRET,
                {expiresIn : parseInt(process.env.JWT_EXPIRES_IN)},
                (err, token ) => {
                    return res.status(200)
                    .json({
                        token,
                        "message" : "Logged in successfully",
                        "user" : {
                            "username" : user.username,
                            "email" : user.email,
                            "password" : user.password
                        }
                    })
                }
            )
        })
})

})

//@route /api/auth/users 

router.get("/users", authmiddleware, (req, res, next) => {

    User.findById(req.user.id)
    .select("-password")
    .then( user => {
        return res.status(200)
        .json({
            "user" : user
        })
    })
    .catch( err => {
        console.error(err);
        next(new HttpError(err, 500))
    })
})

//@route GET /api/auth

router.get("/", (req, res, next) => {

    User.find()
    .select("-password")
    .then(users => {
        res.status(200)
        .json({
            "message" : "Successfully queried the list of users",
            "length" : users.length,
            "users" : users
        })
    })
    .catch(err => {
        next(new HttpError(err, 500));
        console.error(err);
    })
})



module.exports = router;