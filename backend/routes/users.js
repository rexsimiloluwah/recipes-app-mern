const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../errors/HttpError');
const User = require('../models/User');

const router = express.Router()

// @route POST /api/users/register
// @desc Register users.

router.post("/", async (req, res, next) => {
    
    const {username, email, password} = req.body

    if (!username || !email || !password){
        return res.status(400)
        .json({
            "message" : "Please enter username, password and email."
        })
    }

    await User.findOne({email : email})

    .then( user => {
        if (user){
            return res.status(400)
            .json({
                "message" : "User already exists, Please sign in."
            })
        }

        const newUser = new User({
            username : username,
            email : email,
            password : password
        })

        // Create salt and hashing
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err){
                    next(new HttpError(err, 500))
                }

                newUser.password = hash;
                newUser.save()
                .then(user => {
                    console.log(user)

                    jwt.sign(
                        {id : user._id},
                        process.env.JWT_SECRET,
                        {expiresIn : parseInt(process.env.JWT_EXPIRES_IN)},
                        (err, token) => {
                            if(err){
                                next(new HttpError(err, 500))
                            }

                            return res.status(201)
                            .json({
                                token,
                                "message" : "New user successfully created !",
                                user : {
                                    "id" : user._id,
                                    "username" : user.username,
                                    "email" : user.email
                                }
                            })
                            
                        }
                    )
                    

                })
            })
        })

    })
    .catch(err => {
        console.error(err)
        next(new HttpError(err, 500))
    })
})


router.get("/", (req, res, next) => {
    res.send("It works !")
})

module.exports = router;