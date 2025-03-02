// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000/api/bookings' });

// export const getMyBookings = (token) => API.get('/my', {
//     headers: { Authorization: `Bearer ${token}` }
// });

// export const createBooking = (data, token) => API.post('/', data, {
//     headers: { Authorization: `Bearer ${token}` }
// });

// export const cancelBooking = (id, token) => API.delete(`/${id}/cancel`, {
//     headers: { Authorization: `Bearer ${token}` }
// });

// export const getAllBookings = (token) => API.get('/', {
//     headers: { Authorization: `Bearer ${token}` }
// });

// export const updateBooking = (id, data, token) => API.put(`/${id}`, data, {
//     headers: { Authorization: `Bearer ${token}` }
// });

// export const adminDeleteBooking = (id, token) => API.delete(`/${id}`, {
//     headers: { Authorization: `Bearer ${token}` }
// });

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/bookings' });

export const createBooking = (data, token) =>
    API.post('/', data, { headers: { Authorization: `Bearer ${token}` } });

export const getMyBookings = (token) =>
    API.get('/my', { headers: { Authorization: `Bearer ${token}` } });

export const cancelBooking = (id, token) =>
    API.delete(`/${id}/cancel`, { headers: { Authorization: `Bearer ${token}` } });

export const getAllBookings = (token) =>
    API.get('/', { headers: { Authorization: `Bearer ${token}` } });

export const adminApproveBooking = (id, token) =>
    API.put(`/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });

export const adminDeclineBooking = (id, token) =>
    API.put(`/${id}/decline`, {}, { headers: { Authorization: `Bearer ${token}` } });

