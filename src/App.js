import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminServicesPage from './pages/AdminServicesPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminUsersPage from './pages/AdminUsersPage';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(data);
                } catch (error) {
                    console.log('Session expired. Redirecting to login.');
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!user) {
        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage setUser={setUser} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={user.isAdmin ? "/admin/dashboard" : "/dashboard"} />} />
                <Route path="/login" element={<Navigate to={user.isAdmin ? "/admin/dashboard" : "/dashboard"} />} />
                <Route path="/register" element={<Navigate to={user.isAdmin ? "/admin/dashboard" : "/dashboard"} />} />
                
                <Route path="/dashboard" element={<ServicesPage />} />
                <Route path="/bookings" element={<MyBookingsPage />} />
                <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />

                <Route path="/admin/dashboard" element={<AdminDashboard setUser={setUser} />} />
                <Route path="/admin/services" element={<AdminServicesPage />} />
                <Route path="/admin/bookings" element={<AdminBookingsPage />} />
                <Route path="/admin/users" element={user.isAdmin ? <AdminUsersPage /> : <Navigate to="/dashboard" />} />
                
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
