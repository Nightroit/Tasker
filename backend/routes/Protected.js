// routes/protected.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Content = require('../models/Content');
const User = require('../models/Users');

const router = express.Router();

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, '44551', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};


router.post('/protected', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user; // Access userId directly from req.token

    // Step 1: Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { content } = req.body;

    // Step 2: Create a new Content
    const newContent = new Content({
      user: userId, // Assign the userId to the user field
      content,
    });

    // Step 3: Append the new Content to the user's contents array
    user.contents.push(newContent._id);

    // Step 4: Save the user and the new content
    await Promise.all([newContent.save(), user.save()]);

    console.log('Content saved successfully');

    res.status(201).json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving content:', error.message);
    return res.status(500).json({ error: 'There was an error' });
  }
});
module.exports = router;
