// src/pages/Courses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './coursecard'; // adjust the path if needed

const Courses = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/courses');
            setCourses(res.data);
            console.log('Fetched courses:', res.data)
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const updateCourse = async (updated) => {
        try {
            await axios.put(`http://localhost:5000/api/courses/${updated._id}`, updated);
            fetchCourses();
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="page-wrapper">
            <h2><i class="fa-solid fa-swatchbook"></i> All Courses</h2>
            <div className="container">
                {courses.map((course, index) =>
                    course && course.title ? (
                        <CourseCard key={course._id || index} course={course} onUpdate={updateCourse} />
                    ) : (
                        <div key={index}>Invalid course data</div>
                    )
                )}
            </div>
        </div>
    );
};

export default Courses;
