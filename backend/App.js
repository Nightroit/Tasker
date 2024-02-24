// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/Auth.js');
const protectedRoutes = require('./routes/Protected.js');
const authenticateToken = require('./middleware/authenticateToken');
const cors = require('cors');


const app = express();
const PORT = 3000;

// Example CORS headers in Express
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://your-client-app.com'); // Replace with your client's origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json())

// Replace <your-mongo-uri> with your MongoDB URI
mongoose.connect('mongodb+srv://shivam:F56Pg61mpuHWZiVO@cluster0.wgnr7.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongodb connected successfully")
});

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
