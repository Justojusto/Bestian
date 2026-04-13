require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./authRoute');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const resultRoutes = require('./routes/results');
const departmentRoutes = require('./routes/departments');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/departments', departmentRoutes);



// checking if the server is up
app.get('./api/ping', (req, re) => {
    res.json({ message: "Server is alive!"});
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

