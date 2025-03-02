import React, { useState } from 'react';
import { register } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="container">
            <div className="auth-hero">
                <div className="gradient-overlay" />
                <div className="hero-content">
                    <h1>Your Bridge to Career Success</h1>
                    <p>Join thousands of professionals advancing their careers</p>
                </div>
            </div>

            <div className="auth-section">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Start your journey with us</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder=" "
                            />
                            <label>Full Name</label>
                            <span className="input-icon">👤</span>
                        </div>

                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder=" "
                            />
                            <label>Email Address</label>
                            <span className="input-icon">✉️</span>
                        </div>

                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder=" "
                            />
                            <label>Password</label>
                            <span className="input-icon">🔒</span>
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️'}
                            </button>
                        </div>

                        <button type="submit" className="auth-button">
                            Register Now
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <a href="/login">Sign In</a></p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                :root {
                    --primary: rgba(26,54,93,0.9);
                    --primary-dark: rgba(26,54,93,0.9);
                    --accent: rgba(26,54,93,0.9);
                    --text-dark: #1e293b;
                }

                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    min-height: 100vh;
                }

                .auth-hero {
                    position: relative;
                    background: linear-gradient(135deg, rgba(26,54,93,0.1) 0%, rgba(26,54,93,0.9) 0%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .gradient-overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, rgba(26,54,93,0.1) 0%, transparent 100%);
                }

                .hero-content {
                    position: relative;
                    color: white;
                    text-align: center;
                    max-width: 600px;
                }

                .hero-content h1 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .hero-content p {
                    font-size: 1.1rem;
                    opacity: 0.9;
                }

                .auth-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: rgba(26,54,93,0.1);
                }

                .auth-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 1.5rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 440px;
                }

                .auth-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .auth-header h2 {
                    color: var(--text-dark);
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .auth-header p {
                    color: #64748b;
                }

                .input-group {
                    position: relative;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .input-group input {
                    width: 100%;
                    padding: 1rem 3rem 1rem 1rem;
                    border: 2px solidrgba(26,54,93,0.1);
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .input-group input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                    outline: none;
                }

                .input-group label {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    pointer-events: none;
                    transition: all 0.3s ease;
                    background: white;
                    padding: 0 0.5rem;
                }

                .input-group input:focus ~ label,
                .input-group input:not(:placeholder-shown) ~ label {
                    top: 0;
                    font-size: 0.85rem;
                    color: var(--primary);
                }

                .input-icon {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0.6;
                }

                .password-toggle {
                    position: absolute;
                    right: 2.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    opacity: 0.6;
                    padding: 0;
                }

                .auth-button {
                    width: 100%;
                    padding: 1rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 1rem;
                }

                .auth-button:hover {
                    background: var(--primary-dark);
                    transform: translateY(-2px);
                }

                .auth-footer {
                    text-align: center;
                    margin-top: 1.5rem;
                    color:rgb(0, 5, 10);
                }

                .auth-footer a {
                    color: var(--primary);
                    text-decoration: none;
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .container {
                        grid-template-columns: 1fr;
                    }

                    .auth-hero {
                        display: none;
                    }

                    .auth-section {
                        padding: 1.5rem;
                        background: white;
                    }

                    .auth-card {
                        padding: 2rem;
                        box-shadow: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegisterPage;