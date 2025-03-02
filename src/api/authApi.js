import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/auth' });

/**
 * User Registration
 */
export const register = async (userData) => {
    const response = await API.post('/register', userData);
    return response.data;
};

/**
 * User Login
 */
export const login = async (credentials) => {
    const response = await API.post('/login', credentials);
    return response.data;
};

/**
 * Fetch User Profile
 */
export const getProfile = async (token) => {
    const response = await API.get('/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

/**
 * Update User Profile
 */
export const updateProfile = async (profileData, token) => {
    const response = await API.put('/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

/**
 * Upload Profile Photo
 */
export const uploadProfilePhoto = async (formData, token) => {
    const response = await API.post('/upload-photo', formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

/**
 * Forgot Password - Send Reset Email
 */
export const forgotPassword = async (email) => {
    const response = await API.post('/forgot-password', { email });
    return response.data;
};

/**
 * Reset Password - Using Token
 */
export const resetPassword = async (token, password) => {
    const response = await API.post(`/reset-password/${token}`, { password });
    return response.data;
};
