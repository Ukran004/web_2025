import React, { useEffect, useState } from 'react';
import { addService, deleteService, getServices, updateService } from '../api/vendorApi';

const AdminServicesPage = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', image: null });
    const [editService, setEditService] = useState(null);

    const categories = ['All', 'Doctor', 'Engineer', 'Teacher', 'Software developer', 'Therapist']; // Define available categories

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await getServices();
        setServices(data);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await deleteService(id, token);
        fetchServices();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('category', formData.category);
        form.append('price', formData.price);
        if (formData.image) form.append('image', formData.image);

        const token = localStorage.getItem('token');

        if (editService) {
            await updateService(editService._id, form, token);
        } else {
            await addService(form, token);
        }

        setFormData({ name: '', category: '', price: '', image: null });
        setEditService(null);
        fetchServices();
    };

    const handleEdit = (service) => {
        setEditService(service);
        setFormData({
            name: service.name,
            category: service.category,
            price: service.price,
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Manage Services</h1>

            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                <button type="submit">{editService ? 'Update Service' : 'Add Service'}</button>
            </form>

            <ul>
                {services.map(service => (
                    <li key={service._id}>
                        <img src={service.image} alt={service.name} style={{ width: '100px' }} />
                        <h3>{service.name}</h3>
                        <p>{service.category} - ${service.price}</p>
                        <button onClick={() => handleEdit(service)}>Edit</button>
                        <button onClick={() => handleDelete(service._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminServicesPage;
