// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

const API_KEY = "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"; // Replace with your actual OpenAI API key
let lastRequestTime = 0;

// Example usage:
const userMessage = "Hello, ChatGPT! How are you?";

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log("register request")
    try {
        const { username, password } = req.body;
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword });
    
        // Save the user to the database
        await newUser.save();   

        const token = jwt.sign({ userId: newUser._id }, '44551');
        res.status(201).json({ token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

router.post('/login', async (req, res) => {
  console.log("login request")
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log("Invalid Credentials")
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, '44551');
    res.status(200).json({ token });
  } catch (error) {
    console.log("There was an error")
    res.status(500).json({ error: error.message });
  }
});

router.post('/chatgpt', (req, res) => {
  const token = "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"
  fetch('https://chatgpt-api.shn.hk/v1/', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token, 
    }, 
    body: JSON.stringify({
      "model": "gpt-3.5-turbo", 
      "messages": [{"role": "Writer", "content": "Hanuman chalisa"}]
    })
  }).then(res => {
    return res.json()
  }).then(data => {
    console.log(data)
  })
})


module.exports = router;
