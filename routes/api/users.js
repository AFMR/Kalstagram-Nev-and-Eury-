// Express
const express = require('express');
const router = express.Router();

// Bcrypt.js
const bcrypt = require('bcryptjs');

// JSON web token
const jwt = require('jsonwebtoken');

// Imports User model
const User = require('../../models/User');

// Test route
router.get('/test', 
    (req, res) => res.json({
        message: "Test route for users route works"
    })
)

// @route   POST api/users/signup
// @desc    Enables user signup
// @access  Public

// Checks if user exists by email. 
// TODO:    Check if user exists by email, username or password
router.post('/signup', (req, res) => {
    User.findOne({username: req.body.username})
    .then(console.log(req.body))
        .then(user => {
            if(user){
                return res.status(400).json({
                    username: "Username is already taken."
                })
            } else {
                const newUser = new User({
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, 
                        (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        }) 
                });

            }
        });
})

// @route   POST api/users/login
// @desc    Enables user login
// @access  Public

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    user: "User not found"
                });
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            res.json({
                                message: "Login is possible"
                            });
                        } else {
                            return res.status(400).json({
                                password: "Wrong password"
                            });
                        }
                    })
            }
        })


})





module.exports = router;