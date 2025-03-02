import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfilePage = ({ user, setUser }) => {
    const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);

    useEffect(() => setProfilePhoto(user.profilePhoto), [user]);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profilePhoto', file);

        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/upload-photo', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            setProfilePhoto(data.profilePhoto);
            setUser(prev => ({ ...prev, profilePhoto: data.profilePhoto }));
        } catch {
            alert('Upload failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div style={styles.profileContainer}>
            {/* Profile Header */}
            <div style={styles.header}>
                <h1 style={styles.profileHeader}>Profile Settings</h1>
                <button onClick={logout} style={styles.logoutButton}>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Left Column - Profile Overview */}
                <div style={styles.sidebar}>
                    <div style={styles.profileCard}>
                        <div style={styles.photoContainer}>
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    style={styles.profileImage}
                                />
                            ) : (
                                <div style={styles.placeholderImage}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <input
                                type="file"
                                onChange={handlePhotoUpload}
                                style={styles.fileInput}
                                accept="image/*"
                            />
                        </div>
                        <div style={styles.userInfo}>
                            <h2 style={styles.userName}>{user.name}</h2>
                            <p style={styles.userEmail}>{user.email}</p>
                        </div>
                    </div>

                    <div style={styles.statsCard}>
                        <h3 style={styles.sectionTitle}>Activity</h3>
                        <div style={styles.statItem}>
                            <span style={styles.statNumber}>12</span>
                            <span style={styles.statLabel}>Total Bookings</span>
                        </div>
                        <div style={styles.statItem}>
                            <span style={styles.statNumber}>3</span>
                            <span style={styles.statLabel}>Pending Actions</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div style={styles.detailsSection}>
                    <div style={styles.detailsCard}>
                        <h3 style={styles.sectionTitle}>Account Details</h3>
                        <div style={styles.detailItem}>
                            <label style={styles.detailLabel}>Full Name</label>
                            <div style={styles.detailValue}>{user.name}</div>
                        </div>
                        <div style={styles.detailItem}>
                            <label style={styles.detailLabel}>Email Address</label>
                            <div style={styles.detailValue}>{user.email}</div>
                        </div>
                        <div style={styles.detailItem}>
                            <label style={styles.detailLabel}>Member Since</label>
                            <div style={styles.detailValue}>January 2023</div>
                        </div>
                    </div>

                    <div style={styles.detailsCard}>
                        <h3 style={styles.sectionTitle}>Contact Information</h3>
                        <div style={styles.detailItem}>
                            <label style={styles.detailLabel}>Phone Number</label>
                            <div style={styles.detailValue}>+1 (555) 123-4567</div>
                        </div>
                        <div style={styles.detailItem}>
                            <label style={styles.detailLabel}>Address</label>
                            <div style={styles.detailValue}>
                                123 Wedding Lane, Suite 456<br />
                                New York, NY 10001
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 Career Connect. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    profileContainer: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
        padding: '40px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
    },
    profileHeader: {
        fontSize: '28px',
        fontWeight: '600',
        color: 'rgba(26,54,93,0.9)',
        margin: 0,
    },
    mainContent: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        textAlign: 'center',
    },
    photoContainer: {
        position: 'relative',
        margin: '-64px auto 20px',
        width: '120px',
        height: '120px',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid rgba(26,54,93,0.9)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        fontWeight: '600',
        color: 'rgba(26,54,93,0.9)',
        border: '3px solid rgba(26,54,93,0.9)',
    },
    fileInput: {
        position: 'absolute',
        bottom: '0',
        right: '0',
        opacity: '0',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
    },
    userInfo: {
        marginTop: '20px',
    },
    userName: {
        fontSize: '22px',
        fontWeight: '600',
        color: 'rgba(26,54,93,0.9)',
        margin: '0 0 8px',
    },
    userEmail: {
        fontSize: '16px',
        color: '#64748b',
        margin: 0,
    },
    statsCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: 'rgba(26,54,93,0.9)',
        margin: '0 0 20px',
    },
    statItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #f1f5f9',
        ':last-child': {
            borderBottom: 'none',
        }
    },
    statNumber: {
        fontSize: '18px',
        fontWeight: '700',
        color: 'rgba(26,54,93,0.9)',
    },
    statLabel: {
        fontSize: '14px',
        color: '#64748b',
    },
    detailsSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    detailsCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    },
    detailItem: {
        marginBottom: '20px',
        ':last-child': {
            marginBottom: 0,
        }
    },
    detailLabel: {
        display: 'block',
        fontSize: '14px',
        color: '#64748b',
        marginBottom: '8px',
    },
    detailValue: {
        fontSize: '16px',
        color: 'rgba(26,54,93,0.9)',
        fontWeight: '500',
    },
    logoutButton: {
        padding: '12px 24px',
        backgroundColor: 'rgba(26,54,93,0.9)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: 'rgba(1, 1, 87, 0.9)',
            transform: 'translateY(-2px)'
        }
    },
    footer: {
        marginTop: '60px',
        textAlign: 'center',
        paddingTop: '40px',
        borderTop: '1px solid #e2e8f0',
    },
    footerText: {
        fontSize: '14px',
        color: '#64748b',
    },
};

export default ProfilePage;