const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    progress: {
        type: Number,
        default: 0
    },
    lessons: [
        {
            name: String,
            completed: {
                type: Boolean,
                default: false
            }
        }
    ]
});

module.exports = mongoose.model('Course', courseSchema);
