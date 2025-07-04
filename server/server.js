const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Models
const Course = require('./models/Course');
const User = require('./models/User');

// Routes
app.get('/api/courses', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

app.post('/api/progress', async (req, res) => {
    const { userId, courseId, lessonIndex } = req.body;
    const user = await User.findById(userId);
    if (!user.progress[courseId]) user.progress[courseId] = [];
    if (!user.progress[courseId].includes(lessonIndex)) {
        user.progress[courseId].push(lessonIndex);
        await user.save();
    }
    res.json({ success: true });
});

app.get('/api/user/:userId/progress/:courseId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.json(user.progress[req.params.courseId] || []);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));