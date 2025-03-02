import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/userApi';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await getUsers(token);
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUser(userId, token);
            setUsers(users.filter((u) => u._id !== userId));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Users</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user._id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
                        <button onClick={() => handleDelete(user._id)} style={{ backgroundColor: 'red', color: 'white' }}>
                            Delete User
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsersPage;
