import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // this works for both App.js and App.jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
