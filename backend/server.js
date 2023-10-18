// server.js
require('dotenv').config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// routes /////////////////////////////////////////////////////////////////////////////
const welcomeRoutes = require('./routes/welcome/welcomeRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
const moderatorRoutes = require('./routes/moderator/moderatorRoutes');
const studentRoutes = require('./routes/student/studentRoutes');
const protectedRoutes = require('./routes/protected/protectedRoutes');
// middleware /////////////////////////////////////////////////////////////////////////////
const authMiddleware = require('./middleware/auth/authMiddleware');
// /////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set up CORS options
const corsOptions = {
  origin: ['http://nieappworld.com', 'http://localhost:3000'], // Allow requests from these domains
  methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
  optionsSuccessStatus: 200, // Set the status code for successful preflight requests
};

const io = socketIo(server, {
  cors: corsOptions, // Apply CORS configuration to Socket.IO
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/playlist', express.static(path.join(__dirname, '/playlist')));
app.use('/blog_images', express.static(path.join(__dirname, '/blog_images')));
app.use('/recordings', express.static(path.join(__dirname, '/recordings')));
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

io.on("connection", (socket) => {
  socket.connect();
  console.log(`A user connected via WebSocket with ID: ${socket.id}`);
  // Listen for a "message" event from clients
  // socket.on("message", (message) => {
  //   // Broadcast the message to all connected clients, including the sender
  //   io.emit("message", message);
  // });

  socket.on("disconnect", () => {
    console.log(`A user disconnected from ${socket.id}.`);
  });
  socket.on("error", (error) => {
    console.error(`WebSocket Error: ${error.message}`);
  });
});



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

app.use('/api', welcomeRoutes);
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