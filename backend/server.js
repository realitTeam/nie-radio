// server.js
require('dotenv').config();

const express = require("express");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
// routes /////////////////////////////////////////////////////////////////////////////
const authRoutes = require('./routes/auth/authRoutes');
const adminROutes = require('./routes/admin/adminRoutes');
const moderatorRoutes = require('./routes/moderator/moderatorRoutes');
const studentRoutes = require('./routes/student/studentRoutes');
const protectedRoutes = require('./routes/protected/protectedRoutes');
// middleware /////////////////////////////////////////////////////////////////////////////
const authMiddleware = require('./middleware/auth/authMiddleware');
// /////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://nieappworld.com', // Allow requests only from this domain
    methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
    optionsSuccessStatus: 200, // Set the status code for successful preflight requests
  };
  
app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, 'public')));

function checkRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[0]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing." });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (decodedToken.role === role) {
      next(); // User has the correct role, proceed to the next middleware
    } else {
      return res.status(403).json({ message: "Access denied." });
    }
  };
}

app.use('/api', authRoutes); //login + register
// app.use('/api', listenRoutes);
app.use('/api/admin',  adminROutes); //checkRole("admin"),
app.use('/api/moderator', moderatorRoutes);// checkRole("moderator"),
app.use('/api/student', studentRoutes);// checkRole("student"),
app.use('/api/user', protectedRoutes);
// app.use("/api", (req, res, next) => {
//   res.send("Hello Then");
// });
// Serve the React app
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );
});