const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const Users = require('../models/users.js')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

users.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome")
})

users.post('/register', async (req, res) => {
  try {
      console.log(req.body);
    const { username, password } = req.body;
    if ( !username || !password ) {
      res.status(400).send('All input is required');
    }

    const oldUser = await Users.findOne({ username });
    if (oldUser) {
      return res.status(409).send("User already exist")
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    let user = await Users.create({
      username,
      password: encryptedPassword
    });

    const token = jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2",
      }
    )
    user._doc.token = token;
    res.status(201).json(user)
  } catch (err) {
    console.log(err)

  }
})

users.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required")
    }

    let user = await Users.findOne({ username});
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h"
        }
      )
      user._doc.token = token;
      res.status(200).json(user)
    }
    else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
})


module.exports = users
