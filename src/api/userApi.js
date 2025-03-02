import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/users' });

export const getUsers = (token) => API.get('/', {
    headers: { Authorization: `Bearer ${token}` }
});

export const deleteUser = (id, token) => API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});
