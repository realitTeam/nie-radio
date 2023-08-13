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
const listenRoutes = require('./routes/listen/listenRoutes');
// middleware /////////////////////////////////////////////////////////////////////////////
const authMiddleware = require('./middleware/auth/authMiddleware');
// /////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api', authRoutes); //login + register
// app.use('/api', listenRoutes);
app.use('/api/admin', adminROutes); 
app.use('/api/moderator', moderatorRoutes); 
// app.use("/api", (req, res, next) => {
//   res.send("Hello Then");
// });

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