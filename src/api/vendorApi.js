import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/vendors' });

export const getServices = (category = "") => {
    const url = category ? `/?category=${encodeURIComponent(category)}` : "/";
    return API.get(url);
};

export const addService = (formData, token) => API.post('/', formData, {
    headers: { Authorization: `Bearer ${token}` }
});

export const deleteService = (id, token) => API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});

export const updateService = (id, formData, token) => API.put(`/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` }
});
