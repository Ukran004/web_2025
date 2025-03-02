import React, { useEffect, useState } from 'react';
import { cancelBooking, getMyBookings } from '../api/bookingApi';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const { data } = await getMyBookings(token);
        setBookings(data);
    };

    const handleCancel = async (id) => {
        await cancelBooking(id, token);
        fetchBookings();
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return { background: '#e6f4ea', color: '#137333' };
            case 'pending':
                return { background: '#fff3e0', color: '#f57c00' };
            case 'declined':
                return { background: '#fce8e6', color: '#c5221f' };
            default:
                return { background: '#f8f9fa', color: '#6c757d' };
        }
    };

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <div style={styles.header}>
                <h1 style={styles.title}>Applied Jobs</h1>
                <div style={styles.filterContainer}>
                    <select style={styles.filterSelect}>
                        <option value="all">All Applications</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                    </select>
                </div>
            </div>

            {/* Applications Grid */}
            {bookings.length === 0 ? (
                <div style={styles.emptyState}>
                    <div style={styles.emptyContent}>
                        <p style={styles.emptyText}>No applications found</p>
                        <button style={styles.browseButton}>
                            Browse New Opportunities
                        </button>
                    </div>
                </div>
            ) : (
                <div style={styles.grid}>
                    {bookings.map((booking) => (
                        <div key={booking._id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.companyInfo}>
                                   
                                    <div>
                                        <h3 style={styles.position}>{booking.service?.name}</h3>
                                        <p style={styles.company}>{booking.service?.provider}</p>
                                    </div>
                                </div>
                                <span style={styles.applicationId}>#{booking.bookingNumber}</span>
                            </div>

                            <div style={styles.details}>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Applied Date:</span>
                                    <span style={styles.detailValue}>
                                        {new Date(booking.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Status:</span>
                                    <span style={{...styles.statusBadge, ...getStatusStyle(booking.status)}}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Salary:</span>
                                    <span style={styles.salary}>${booking.service?.price}</span>
                                </div>
                            </div>

                            <div style={styles.actions}>
                                <button style={styles.viewButton}>
                                    View Application Details
                                </button>
                                <button 
                                    onClick={() => handleCancel(booking._id)}
                                    style={styles.cancelButton}
                                >
                                    Withdraw Application
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div style={styles.footer}>
                © 2024 Career Connect. All rights reserved.
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '32px',
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px',
    },
    title: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#1a1a1a',
        margin: 0,
    },
    filterContainer: {
        position: 'relative',
    },
    filterSelect: {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        backgroundColor: 'white',
        fontSize: '14px',
        width: '240px',
        appearance: 'none',
        cursor: 'pointer',
        ':focus': {
            outline: 'none',
            borderColor: '#4f46e5',
            boxShadow: '0 0 0 2px rgba(79,70,229,0.1)',
        }
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        }
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
    },
    companyInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    companyLogo: {
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        objectFit: 'cover',
    },
    position: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1a1a1a',
        margin: '0 0 4px 0',
    },
    company: {
        fontSize: '14px',
        color: '#666',
        margin: 0,
    },
    applicationId: {
        fontSize: '14px',
        color: '#999',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '20px',
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: '14px',
        color: '#666',
    },
    detailValue: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#1a1a1a',
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    salary: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#4f46e5',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    viewButton: {
        padding: '12px',
        backgroundColor: 'rgba(26,54,93,0.9)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#4338ca',
        }
    },
    cancelButton: {
        padding: '12px',
        backgroundColor: 'transparent',
        color: '#4f46e5',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        ':hover': {
            borderColor: '#4f46e5',
        }
    },
    emptyState: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    emptyContent: {
        textAlign: 'center',
        padding: '40px',
    },
    emptyText: {
        fontSize: '18px',
        color: '#666',
        marginBottom: '24px',
    },
    browseButton: {
        padding: '12px 24px',
        backgroundColor: 'rgba(26,54,93,0.9)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#4338ca',
        }
    },
    footer: {
        textAlign: 'center',
        padding: '24px',
        color: '#666',
        fontSize: '14px',
        borderTop: '1px solid #eee',
        marginTop: '40px',
    },
};

export default MyBookingsPage;