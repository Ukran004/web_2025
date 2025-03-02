import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();

    return (
        <div style={navStyle}>
            <button onClick={() => navigate('/dashboard')}>🏠 Services</button>
            <button onClick={() => navigate('/bookings')}>📅 Bookings</button>
            <button onClick={() => navigate('/profile')}>👤 Profile</button>
        </div>
    );
};

const navStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0',
    background: 'maroon',
    color: 'white',
};

export default BottomNav;
