const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});


router.post('/', async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await Course.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
});

module.exports = router;
