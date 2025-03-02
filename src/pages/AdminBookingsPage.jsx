// import React, { useEffect, useState } from 'react';
// import { getAllBookings, adminDeleteBooking } from '../api/bookingApi';

// const AdminBookingsPage = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const fetchBookings = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const { data } = await getAllBookings(token);
//             setBookings(data);
//         } catch (error) {
//             setError('Failed to fetch bookings.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         const token = localStorage.getItem('token');
//         if (!window.confirm('Are you sure you want to delete this booking?')) return;

//         try {
//             await adminDeleteBooking(id, token);
//             setBookings(bookings.filter((booking) => booking._id !== id));
//             alert('Booking deleted successfully');
//         } catch (error) {
//             alert('Failed to delete booking');
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>Manage All Bookings</h2>
//             <ul>
//                 {bookings.map((booking) => (
//                     <li key={booking._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '15px' }}>
//                         <p><strong>User:</strong> {booking.user?.name} ({booking.user?.email})</p>
//                         <p><strong>Service:</strong> {booking.service?.name}</p>
//                         <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
//                         <p><strong>Guests:</strong> {booking.guestCount}</p>
//                         <button onClick={() => handleDelete(booking._id)}>Delete Booking</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AdminBookingsPage;

import React, { useEffect, useState } from 'react';
import { getAllBookings, adminApproveBooking, adminDeclineBooking } from '../api/bookingApi';

const AdminBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await getAllBookings(token);
            setBookings(data);
        } catch (error) {
            setError('Failed to fetch bookings.');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await adminApproveBooking(id, token);
            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: 'confirmed' } : booking
            ));
            alert('Booking approved');
        } catch (error) {
            alert('Failed to approve booking');
        }
    };

    const handleDecline = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await adminDeclineBooking(id, token);
            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: 'declined' } : booking
            ));
            alert('Booking declined');
        } catch (error) {
            alert('Failed to decline booking');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Manage All Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '15px' }}>
                        <p><strong>User:</strong> {booking.user?.name} ({booking.user?.email})</p>
                        <p><strong>Service:</strong> {booking.service?.name}</p>
                        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                        <p><strong>Guests:</strong> {booking.guestCount}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        {booking.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => handleApprove(booking._id)}
                                    style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDecline(booking._id)}
                                    style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                >
                                    Decline
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminBookingsPage;


