// src/pages/CreateCourse.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        lessons: [{ name: '', completed: false }]
    });

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        if (name === 'lesson' && index !== null) {
            const updatedLessons = [...newCourse.lessons];
            updatedLessons[index].name = value;
            setNewCourse({ ...newCourse, lessons: updatedLessons });
        } else {
            setNewCourse({ ...newCourse, [name]: value });
        }
    };

    const addLessonField = () => {
        setNewCourse({
            ...newCourse,
            lessons: [...newCourse.lessons, { name: '', completed: false }]
        });
    };

    const removeLessonField = (index) => {
        const updatedLessons = newCourse.lessons.filter((_, i) => i !== index);
        setNewCourse({ ...newCourse, lessons: updatedLessons });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: newCourse.title,
                description: newCourse.description,
                lessons: newCourse.lessons
            };

            await axios.post('http://localhost:5000/api/courses', payload);
            alert('✅ Course added successfully!');
            setNewCourse({ title: '', description: '', lessons: [{ name: '', completed: false }] });
        } catch (error) {
            console.error('Error adding course:', error);
            alert('❌ Failed to add course');
        }
    };

    return (
        <div className="page-wrapper">
            <h2><i className="fa-solid fa-book"></i> Create New Course</h2>

            <form onSubmit={handleSubmit} className="card add-course-form">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="e.g., Full Stack Development"
                    value={newCourse.title}
                    onChange={handleChange}
                    required
                    className="form-input"
                />

                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    placeholder="Short summary of the course"
                    value={newCourse.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="form-textarea"
                />

                <label className="form-label">Lessons</label>
                {newCourse.lessons.map((lesson, index) => (
                    <div key={index} className="lesson-row">
                        <input
                            type="text"
                            name="lesson"
                            placeholder={`Lesson ${index + 1}`}
                            value={lesson.name}
                            onChange={(e) => handleChange(e, index)}
                            required
                            className="form-input"
                        />
                        <button
                            type="button"
                            onClick={() => removeLessonField(index)}
                            className="btn-delete"
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))}

                <div className="button-group">
                    <button type="button" onClick={addLessonField} className="btn-secondary">
                        <i className="fa-solid fa-plus"></i> Add Lesson
                    </button>
                    <button type="submit" className="btn-primary">
                        <i className="fa-solid fa-circle-check"></i> Create Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
