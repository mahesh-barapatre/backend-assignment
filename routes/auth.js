const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

const router = express.Router();

const saltRounds = 10;
const secretKey = 'mahesh';

router.post('/signup', async (req, res) => {
  try {
    const { name, password, dob, hobbies, age } = req.body;

    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      password: hashedPassword,
      dob,
      hobbies,
      age
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, name: newUser.name }, secretKey, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: true });

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password mismatch" });
    }

    const token = jwt.sign({ userId: user._id, name: user.name }, secretKey, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: true });

    res.json({ message: "Logged in successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
