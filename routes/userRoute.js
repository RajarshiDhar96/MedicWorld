const { Router } = require('express')
const express = require('express')

const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

router.post('/register', async (req, res) => {

    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).send({message:"User created successfully", success:true})

    }

    catch (error) {

    }

})



router.post('/login', async (req, res) => {

    try {


    }

    catch (error) {

    }

})

module.exports = router;