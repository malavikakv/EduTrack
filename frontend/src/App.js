
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Courses from './pages/courses';
import CreateCourse from './pages/createcourse'
import './App.css';

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <Router>
            <div className="app">
                <div className="topbar">
                    <button className="hamburger" onClick={() => setSidebarOpen(!isSidebarOpen)}>☰</button>
                    <h1 className="title">EduTrack</h1>
                </div>
                <div className="layout">
                    {isSidebarOpen && <Sidebar />}
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Navigate to="/courses" />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/create" element={<CreateCourse />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
