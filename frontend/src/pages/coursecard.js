// src/components/CourseCard.js
import React, { useState } from 'react';

const CourseCard = ({ course, onUpdate }) => {
    // ✅ Guard against missing or malformed course data
    if (!course || !course.title || !Array.isArray(course.lessons)) {
        return <div className="card">Invalid course data</div>;
    }

    const [editing, setEditing] = useState(false);
    const [editedCourse, setEditedCourse] = useState({ ...course });

    const toggleLessonCompletion = (index) => {
        const updated = { ...editedCourse };
        updated.lessons[index].completed = !updated.lessons[index].completed;
        const completedCount = updated.lessons.filter((l) => l.completed).length;
        updated.progress = (completedCount / updated.lessons.length) * 100;
        setEditedCourse(updated);
        onUpdate(updated);
    };

    const handleChange = (e, i = null) => {
        const { name, value } = e.target;
        if (name === 'lesson' && i !== null) {
            const updatedLessons = [...editedCourse.lessons];
            updatedLessons[i].name = value;
            setEditedCourse({ ...editedCourse, lessons: updatedLessons });
        } else {
            setEditedCourse({ ...editedCourse, [name]: value });
        }
    };

    const addLessonField = () => {
        setEditedCourse({
            ...editedCourse,
            lessons: [...editedCourse.lessons, { name: '', completed: false }],
        });
    };

    const removeLessonField = (index) => {
        const updatedLessons = editedCourse.lessons.filter((_, i) => i !== index);
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const progress = (completedCount / (updatedLessons.length || 1)) * 100;
        setEditedCourse({ ...editedCourse, lessons: updatedLessons, progress });
    };

    const saveChanges = () => {
        onUpdate(editedCourse);
        setEditing(false);
    };

    return (
        <div className="card">
            {editing ? (
                <>
                    <input
                        type="text"
                        name="title"
                        value={editedCourse.title}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <textarea
                        name="description"
                        value={editedCourse.description}
                        onChange={handleChange}
                        className="form-textarea"
                    />

                    <label>Lessons:</label>
                    {editedCourse.lessons.map((lesson, i) => (
                        <div key={i} className="lesson-row">
                            <input
                                type="text"
                                name="lesson"
                                value={lesson.name}
                                onChange={(e) => handleChange(e, i)}
                                className="form-input"
                            />
                            <button
                                type="button"
                                onClick={() => removeLessonField(i)}
                                className="btn-delete"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}
                    <button onClick={addLessonField} className="btn-secondary">
                        <i className="fa-solid fa-plus"></i> Add Lesson
                    </button>
                    <br />
                    <button onClick={saveChanges} className="btn-primary">
                        <i className="fa-solid fa-floppy-disk"></i> Save
                    </button>
                </>
            ) : (
                <>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>

                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{ width: `${course.progress || 0}%` }}
                        ></div>
                    </div>

                    <ul>
                        {course.lessons.map((lesson, i) => (
                            <li key={i}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={lesson.completed}
                                        onChange={() => toggleLessonCompletion(i)}
                                    />
                                    {lesson.name || `Lesson ${i + 1}`}
                                </label>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setEditing(true)}
                        className="btn-secondary"
                    >
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                </>
            )}
        </div>
    );
};

export default CourseCard;
