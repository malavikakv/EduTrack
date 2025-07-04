// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';           // App includes your routes
import './index.css';              // Global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
