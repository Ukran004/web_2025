// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../api/authApi';
// import './AuthStyles.css';  // Use your custom CSS for maroon theme

// const LoginPage = ({ setUser }) => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { token, user } = await login(formData);
//             localStorage.setItem('token', token);
//             setUser(user);
//             navigate(user.isAdmin ? '/admin/dashboard' : '/dashboard');
//         } catch (error) {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-left">
//                 <h1>Plan Your Perfect Wedding</h1>
//                 <p>Join us to create memories that last a lifetime.</p>
//             </div>
//             <div className="auth-right">
//                 <h2 className="logo">LOGO</h2>
//                 <h3>Welcome Back</h3>
//                 <form onSubmit={handleSubmit}>
//                     <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
//                     <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                     <button type="submit">Login</button>
//                 </form>
//                 <p>Don’t have an account? <a href="/register">Register now</a></p>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const LoginPage = ({ setUser }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const images = ['/images/job1.jpg', '/images/jon2.png'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, user } = await login(formData);
            localStorage.setItem('token', token);
            setUser(user);
            navigate(user.isAdmin ? '/admin/dashboard' : '/dashboard');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container">
            <div className="background-slider">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentImage ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                <div className="gradient-overlay" />
            </div>

            <div className="auth-container">
                <div className="auth-card">
                    <div className="header">
                        <h1>Welcome Back</h1>
                        <p>Navigate. Connect. Thrive.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
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

                        <button type="submit" className="login-button">
                            Sign In
                            <span className="button-gradient" />
                        </button>
                    </form>

                    <div className="footer">
                        <p>New here? <a href="/register">Create account</a></p>
                        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                :root {
                    --primary: #1a365d;
                    --primary-dark: #0f2a4d;
                    --accent: #4299e1;
                }

                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    min-height: 100vh;
                    position: relative;
                }

                .background-slider {
                    position: relative;
                    overflow: hidden;
                }

                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    background-size: cover;
                    background-position: center;
                    transition: opacity 1s ease-in-out;
                }

                .slide.active {
                    opacity: 1;
                }

                .gradient-overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, rgba(26,54,93,0.9) 0%, rgba(15,42,77,0.7) 100%);
                }

                .auth-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: #ffffff;
                }

                .auth-card {
                    max-width: 440px;
                    width: 100%;
                    padding: 3rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-height: 500px;
                }

                .header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .header h1 {
                    color: var(--primary-dark);
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .header p {
                    color: #666;
                    font-size: 0.9rem;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    margin: 2rem 0;
                    gap: 1.5rem;
                }

                .input-group {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .input-group input {
                    width: 100%;
                    padding: 0.8rem 2.8rem 0.8rem 1rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                }

                .input-group input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(26,54,93,0.1);
                }

                .input-group label {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #888;
                    pointer-events: none;
                    transition: all 0.3s ease;
                    background: white;
                    padding: 0 0.3rem;
                }

                .input-group input:focus ~ label,
                .input-group input:not(:placeholder-shown) ~ label {
                    top: 0;
                    font-size: 0.75rem;
                    color: var(--primary);
                }

                .input-icon {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0.6;
                    font-size: 0.9rem;
                }

                .password-toggle {
                    position: absolute;
                    right: 0.8rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    opacity: 0.6;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .login-button {
                    width: 100%;
                    padding: 0.8rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }

                .login-button:hover {
                    transform: translateY(-2px);
                    background: var(--primary-dark);
                }

                .button-gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.2) 100%);
                }

                .footer {
                    margin-top: 1.5rem;
                    text-align: center;
                    font-size: 0.85rem;
                    color: #666;
                }

                .footer a {
                    color: var(--primary);
                    text-decoration: none;
                    font-weight: 500;
                }

                .forgot-password {
                    display: block;
                    margin-top: 0.8rem;
                }

                @media (max-width: 768px) {
                    .container {
                        grid-template-columns: 1fr;
                    }

                    .background-slider {
                        display: none;
                    }

                    .auth-container {
                        padding: 1rem;
                        background: linear-gradient(45deg, rgba(26,54,93,0.9) 0%, rgba(15,42,77,0.7) 100%);
                    }

                    .auth-card {
                        padding: 2rem 1.5rem;
                        max-width: 100%;
                        min-height: auto;
                        box-shadow: none;
                        background: rgba(255,255,255,0.95);
                    }

                    form {
                        margin: 1.5rem 0;
                        gap: 1.2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;