// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { createBooking } from '../api/bookingApi';
// import { getServices } from '../api/vendorApi';

// import PropTypes from 'prop-types'; // Import PropTypes

// const ServicesPage = () => {
//     const [services, setServices] = useState([]);
//     const [category, setCategory] = useState('All'); // Default to "All"
//     const [searchQuery, setSearchQuery] = useState('');

//     const categories = ['All', 'Doctor', 'Engineer', 'Teacher', 'Software developer', 'Therapist'];

//     const navigate = useNavigate(); // Initialize navigate function

//     useEffect(() => {
//         fetchServices();
//     }, [category]);

//     const fetchServices = async () => {
//         try {
//             const { data } = await getServices(category);
//             setServices(data);
//         } catch (error) {
//             console.error("Error fetching services:", error);
//         }
//     };

//     const handleBook = async (serviceId) => {
//         const token = localStorage.getItem('token');
//         const bookingData = {
//             service: serviceId,
//             date: new Date().toISOString(),
//             guestCount: 100
//         };

//         try {
//             await createBooking(bookingData, token);
//             alert('Service booked successfully!');
//         } catch (error) {
//             alert('Failed to book service.');
//         }
//     };

//     // Filter services by search query
//     const filteredServices = services.filter(service =>
//         service.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleProfile = () => {
//         // Navigate to profile page
//         navigate('/profile');
//     };

//     return (
//         <div style={styles.container}>
//             {/* Quick Stats */}
//             <div style={styles.quickStats}>
//                 <div style={styles.statCard}>
//                     <h3 style={styles.statNumber}>{services.length}</h3>
//                     <p style={styles.statLabel}>Total jobs</p>
//                 </div>
//                 <div style={styles.statCard}>
//                     <h3 style={styles.statNumber}>$25,000</h3>
//                     <p style={styles.statLabel}>Total Budget</p>
//                 </div>
//                 <div style={styles.statCard}>
//                     <h3 style={styles.statNumber}>150</h3>
//                     <p style={styles.statLabel}>Total Applied</p>
//                 </div>
//             </div>

//             {/* Quick Actions */}
//             <div style={styles.quickActions}>
//                 <button onClick={() => navigate('/bookings')} style={styles.actionButton}>
//                     Applied History
//                 </button>
//                 <button onClick={handleProfile} style={styles.actionButton}>
//                     Profile
//                 </button>
//             </div>

//             {/* Services Section */}
//             <div style={styles.servicesSection}>
//                 <h2 style={styles.servicesHeader}> Find Jobs</h2>

//                 {/* Category Filter & Search */}
//                 <div style={styles.filterSection}>
//                     <select
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         style={styles.filterDropdown}
//                     >
//                         {categories.map((cat) => (
//                             <option key={cat} value={cat}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>

//                     <input
//                         type="text"
//                         placeholder="Search jobs..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         style={styles.searchInput}
//                     />
//                 </div>

//                 {/* Services Grid */}
//                 <div style={styles.servicesGrid}>
//                     {filteredServices.length > 0 ? (
//                         filteredServices.map((service) => (
//                             <div key={service._id} style={styles.serviceCard}>
//                                 <img
//                                     src={service.image}
//                                     alt={service.name}
//                                     style={styles.serviceImage}
//                                 />
//                                 <div style={styles.serviceDetails}>
//                                     <p style={styles.serviceCategory}>{service.category}</p>
//                                     <h3 style={styles.serviceName}>{service.name}</h3>
//                                     <p style={styles.serviceDescription}>
//                                         {service.description || 'Quality service for your event'}
//                                     </p>
//                                     <p style={styles.servicePrice}>${service.price}</p>
//                                     <button
//                                         onClick={() => handleBook(service._id)}
//                                         style={styles.bookButton}
//                                     >
//                                         Apply Now
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p style={styles.noServices}>No jobs found.</p>
//                     )}
//                 </div>
//             </div>

//             {/* Footer */}
//             <footer style={styles.footer}>
//                 <p style={styles.footerText}>© 2024 Career Connect. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };

// // Prop Types Validation
// ServicesPage.propTypes = {
//     user: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         email: PropTypes.string,
//     }).isRequired,
//     services: PropTypes.arrayOf(
//         PropTypes.shape({
//             _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//             name: PropTypes.string.isRequired,
//             category: PropTypes.string.isRequired,
//             price: PropTypes.number.isRequired,
//             image: PropTypes.string,
//             description: PropTypes.string,
//         })
//     ).isRequired,
//     handleBook: PropTypes.func.isRequired,
// };

// // Default Props (Optional)
// ServicesPage.defaultProps = {
//     user: { name: 'Guest', email: '' }, // Default user if not provided
//     services: [], // Default services if not provided
//     handleBook: () => { }, // Default handleBook if not provided
// };

// export default ServicesPage;

// // Styles
// const styles = {
//     container: {
//         padding: '30px 40px',
//         fontFamily: "'Inter', sans-serif",
//         backgroundColor: '#f8fafc',
//         minHeight: '100vh',
//     },
//     quickStats: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         marginBottom: '40px',
//         gap: '20px',
//     },
//     statCard: {
//         textAlign: 'center',
//         backgroundColor: '#ffffff',
//         padding: '25px',
//         borderRadius: '12px',
//         boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
//         flex: '1',
//         transition: 'transform 0.2s ease',
//         ':hover': {
//             transform: 'translateY(-3px)'
//         }
//     },
//     statNumber: {
//         fontSize: '32px',
//         fontWeight: '700',
//         color: '#1e293b',
//         margin: '0',
//     },
//     statLabel: {
//         fontSize: '16px',
//         color: '#64748b',
//         margin: '8px 0 0',
//     },
//     quickActions: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         gap: '15px',
//         marginBottom: '40px',
//     },
//     actionButton: {
//         padding: '12px 24px',
//         backgroundColor: '#4f46e5',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         fontSize: '14px',
//         fontWeight: '500',
//         transition: 'all 0.2s ease',
//         ':hover': {
//             backgroundColor: '#4338ca',
//             transform: 'translateY(-1px)'
//         }
//     },
//     servicesSection: {
//         marginBottom: '50px',
//     },
//     servicesHeader: {
//         fontSize: '28px',
//         fontWeight: '700',
//         color: '#1e293b',
//         marginBottom: '30px',
//     },
//     filterSection: {
//         display: 'flex',
//         gap: '15px',
//         marginBottom: '30px',
//     },
//     filterDropdown: {
//         padding: '12px 16px',
//         fontSize: '14px',
//         borderRadius: '8px',
//         border: '1px solid #e2e8f0',
//         backgroundColor: '#ffffff',
//         cursor: 'pointer',
//         minWidth: '200px',
//     },
//     searchInput: {
//         flex: '1',
//         padding: '12px 16px',
//         fontSize: '14px',
//         borderRadius: '8px',
//         border: '1px solid #e2e8f0',
//         transition: 'border-color 0.2s ease',
//         ':focus': {
//             outline: 'none',
//             borderColor: '#4f46e5'
//         }
//     },
//     servicesGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
//         gap: '25px',
//     },
//     serviceCard: {
//         backgroundColor: '#ffffff',
//         borderRadius: '12px',
//         overflow: 'hidden',
//         boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
//         transition: 'all 0.2s ease',
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '380px',
//         ':hover': {
//             transform: 'translateY(-5px)',
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
//         }
//     },
//     serviceImage: {
//         width: '100%',
//         height: '220px',
//         objectFit: 'cover',
//         borderBottom: '1px solid #f1f5f9',
//     },
//     serviceDetails: {
//         padding: '20px',
//         flex: '1',
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     serviceCategory: {
//         fontSize: '12px',
//         color: '#4f46e5',
//         fontWeight: '600',
//         margin: '0 0 8px',
//         textTransform: 'uppercase',
//     },
//     serviceName: {
//         fontSize: '20px',
//         fontWeight: '600',
//         color: '#1e293b',
//         margin: '0 0 12px',
//     },
//     serviceDescription: {
//         fontSize: '14px',
//         color: '#64748b',
//         lineHeight: '1.5',
//         margin: '0 0 15px',
//         flex: '1',
//     },
//     servicePrice: {
//         fontSize: '18px',
//         fontWeight: '700',
//         color: '#1e293b',
//         margin: '0 0 15px',
//     },
//     bookButton: {
//         width: '100%',
//         padding: '12px',
//         backgroundColor: '#4f46e5',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         fontSize: '14px',
//         fontWeight: '500',
//         transition: 'background-color 0.2s ease',
//         ':hover': {
//             backgroundColor: '#4338ca'
//         }
//     },
//     noServices: {
//         textAlign: 'center',
//         gridColumn: '1 / -1',
//         color: '#64748b',
//         fontSize: '16px',
//         padding: '40px 0',
//     },
//     footer: {
//         textAlign: 'center',
//         marginTop: '60px',
//         padding: '30px',
//         backgroundColor: '#ffffff',
//         borderRadius: '12px',
//         boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
//     },
//     footerText: {
//         fontSize: '14px',
//         color: '#64748b',
//         margin: '0',
//     },
// };


import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../api/bookingApi';
import { getServices } from '../api/vendorApi';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [category, setCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['All', 'Doctor', 'Engineer', 'Teacher', 'Software developer', 'Therapist'];
    const navigate = useNavigate();

    useEffect(() => { fetchServices(); }, [category]);

    const fetchServices = async () => {
        try {
            const { data } = await getServices(category);
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const handleBook = async (serviceId) => {
        const token = localStorage.getItem('token');
        try {
            await createBooking({
                service: serviceId,
                date: new Date().toISOString(),
                guestCount: 100
            }, token);
            alert('Service booked successfully!');
        } catch (error) {
            alert('Failed to book service.');
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleProfile = () => navigate('/profile');

    return (
        <div style={styles.container}>
            {/* Left Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarSection}>
                    <h3 style={styles.sidebarTitle}>Search Activity</h3>
                    <div style={styles.statsCard}>
                        <div style={styles.statItem}>
                            <span style={styles.statNumber}>{services.length}</span>
                            <div>
                                <p style={styles.statLabel}> Jobs</p>
                                <small style={styles.statSubtext}>12% this week</small>
                            </div>
                        </div>
                        <div style={styles.statItem}>
                            <span style={styles.statNumber}>15</span>
                            <div>
                                <p style={styles.statLabel}>Saved Jobs</p>
                                <button style={styles.viewAllButton}>View all</button>
                            </div>
                        </div>
                        <div style={styles.statItem}>
                            <span style={styles.statNumber}>142</span>
                            <div>
                                <p style={styles.statLabel}>Profile Views</p>
                                <small style={styles.statSubtext}>Last 30 days</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.sidebarSection}>
                    <h3 style={styles.sidebarTitle}>Reported Searches</h3>
                    <ul style={styles.searchList}>
                        {['UX Designer in Pokhara', 'Product Manager ', 'Frontend Developer Kathmandu'].map(
                            (search, index) => (
                                <li key={index} style={styles.searchItem}>{search}</li>
                            )
                        )}
                    </ul>
                </div>

                <div style={styles.sidebarSection}>
                    <h3 style={styles.sidebarTitle}>Recommended Categories</h3>
                    <div style={styles.categoryGrid}>
                        {['Software Development', 'Design', 'Marketing'].map((cat, index) => (
                            <div key={index} style={styles.categoryCard}>
                                <h4 style={styles.categoryTitle}>{cat}</h4>
                                <p style={styles.categoryCount}>2.4k jobs</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Find Jobs</h1>
                    <div style={styles.actions}>
                        <button onClick={() => navigate('/bookings')} style={styles.actionButton}>
                            Applied Jobs
                        </button>
                        <button onClick={handleProfile} style={styles.actionButton}>
                            My Profile
                        </button>
                    </div>
                </div>

                <div style={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search for jobs, companies, or keywords"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.filterDropdown}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.servicesGrid}>
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                            <div key={service._id} style={styles.serviceCard}>
                                <div style={styles.cardImageContainer}>
                                    <img
                                        src={service.image || 'https://via.placeholder.com/300'}
                                        alt={service.name}
                                        style={styles.serviceImage}
                                    />
                                </div>
                                <div style={styles.cardContent}>
                                    <div style={styles.textSection}>
                                        <p style={styles.serviceCategory}>{service.category}</p>
                                        <h3 style={styles.serviceName}>{service.name}</h3>
                                        <p style={styles.serviceDescription}>
                                            {service.description || 'Professional service for your needs'}
                                        </p>
                                        <div style={styles.metaInfo}>

                                            <span style={styles.metaItem}>
                                                <span style={styles.metaLabel}>Salary:</span>
                                                Rs.{service.price}/year
                                            </span>
                                        </div>
                                    </div>
                                    <div style={styles.actionSection}>
                                        <p style={styles.postedDate}>Posted 2 days ago</p>
                                        <button
                                            onClick={() => handleBook(service._id)}
                                            style={styles.bookButton}
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={styles.noResults}>
                            <p style={styles.noResultsText}>No jobs found matching your criteria</p>
                        </div>
                    )}
                </div>

                <footer style={styles.footer}>
                    <p style={styles.footerText}>© 2024 Career Connect. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

ServicesPage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
    }).isRequired,
    services: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string,
            description: PropTypes.string,
        })
    ).isRequired,
    handleBook: PropTypes.func.isRequired,
};

ServicesPage.defaultProps = {
    user: { name: 'Guest', email: '' },
    services: [],
    handleBook: () => { },
};

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
    },
    sidebar: {
        width: '320px',
        padding: '32px 24px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
    },
    mainContent: {
        flex: 1,
        padding: '32px 40px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#0f172a',
        margin: 0,
    },
    actions: {
        display: 'flex',
        gap: '16px',
    },
    actionButton: {
        padding: '12px 24px',
        backgroundColor: 'rgba(26,54,93,0.9)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: '#4338ca',
            transform: 'translateY(-1px)'
        }
    },
    searchBar: {
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
    },
    searchInput: {
        flex: 1,
        padding: '12px 24px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '16px',
    },
    filterDropdown: {
        padding: '12px 24px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: '#ffffff',
    },
    servicesGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        marginBottom: '40px',
    },
    serviceCard: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        gap: '25px',
        ':hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
    },
    cardImageContainer: {
        width: '220px',
        height: '160px',
        flexShrink: 0,
        borderRadius: '8px',
        overflow: 'hidden',
    },
    serviceImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    cardContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
    },
    textSection: {
        flex: 1,
    },
    serviceCategory: {
        fontSize: '14px',
        color: '#4f46e5',
        fontWeight: '600',
        margin: '0 0 8px',
        textTransform: 'uppercase',
    },
    serviceName: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#0f172a',
        margin: '0 0 12px',
    },
    serviceDescription: {
        fontSize: '14px',
        color: '#64748b',
        lineHeight: '1.5',
        margin: '0 0 15px',
    },
    metaInfo: {
        display: 'flex',
        gap: '30px',
    },
    metaItem: {
        fontSize: '14px',
        color: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
    },
    metaLabel: {
        fontSize: '12px',
        color: '#64748b',
        marginBottom: '4px',
    },
    actionSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '15px',
        minWidth: '180px',
    },
    postedDate: {
        fontSize: '12px',
        color: '#94a3b8',
        margin: '0',
    },
    bookButton: {
        padding: '12px 30px',
        backgroundColor: 'rgba(26,54,93,0.9)',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s ease',
        ':hover': {
            backgroundColor: '#4338ca'
        }
    },
    sidebarSection: {
        marginBottom: '32px',
    },
    sidebarTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '16px',
    },
    statsCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '20px',
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 0',
        borderBottom: '1px solid #e2e8f0',
        ':last-child': { borderBottom: 'none' }
    },
    statNumber: { fontSize: '24px', fontWeight: '700', color: '#0f172a' },
    statLabel: { fontSize: '14px', color: '#0f172a', margin: 0 },
    statSubtext: { fontSize: '12px', color: '#64748b' },
    viewAllButton: {
        background: 'none',
        border: 'none',
        color: '#3b82f6',
        fontSize: '12px',
        cursor: 'pointer',
        padding: 0,
    },
    searchList: { listStyle: 'none', padding: 0, margin: 0 },
    searchItem: {
        fontSize: '14px',
        color: '#0f172a',
        padding: '12px 0',
        borderBottom: '1px solid #f1f5f9',
        ':last-child': { borderBottom: 'none' }
    },
    categoryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
    },
    categoryCard: {
        backgroundColor: '#f8fafc',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
    },
    categoryTitle: { fontSize: '14px', margin: '0 0 4px 0', color: '#0f172a' },
    categoryCount: { fontSize: '12px', color: '#64748b', margin: 0 },
    footer: {
        textAlign: 'center',
        padding: '24px',
        color: '#64748b',
        fontSize: '14px',
        borderTop: '1px solid #e2e8f0',
    },
    noResults: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '40px 0',
    },
    noResultsText: {
        color: '#64748b',
        fontSize: '16px',
    }
};

export default ServicesPage;