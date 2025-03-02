import React from 'react';

const AdminDashboard = ({ setUser }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1>Admin Portal</h1>
                </div>
                
                <nav className="sidebar-nav">
                    <a href="/admin/services" className="nav-item">
                        <span className="nav-icon">🛠️</span>
                        <span className="nav-text">Manage Services</span>
                    </a>
                    <a href="/admin/bookings" className="nav-item">
                        <span className="nav-icon">📅</span>
                        <span className="nav-text">Manage Bookings</span>
                    </a>
                </nav>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <div className="header-right">
                        <button className="logout-btn" onClick={handleLogout}>
                            <span>👤</span>
                            Logout
                        </button>
                    </div>
                </header>

                <div className="dashboard-welcome">
                    <h2>Welcome, Admin</h2>
                    <p>Manage your platform services and bookings</p>
                </div>
            </main>

            <style jsx>{`
                :root {
                    --primary: #4f46e5;
                    --primary-dark: #4338ca;
                    --background: #f8fafc;
                    --text-dark: #1e293b;
                    --sidebar-width: 260px;
                }

                .admin-dashboard {
                    display: flex;
                    min-height: 100vh;
                    background: var(--background);
                }

                .sidebar {
                    width: var(--sidebar-width);
                    background: white;
                    padding: 1.5rem;
                    box-shadow: 4px 0 15px rgba(0,0,0,0.05);
                    position: fixed;
                    height: 100%;
                }

                .sidebar-header {
                    padding: 1rem;
                    margin-bottom: 2rem;
                }

                .sidebar-header h1 {
                    color: var(--primary);
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                .sidebar-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    border-radius: 8px;
                    color: #64748b;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .nav-item:hover {
                    background: #f1f5f9;
                    color: var(--primary);
                }

                .nav-icon {
                    margin-right: 1rem;
                    font-size: 1.2rem;
                }

                .nav-text {
                    font-weight: 500;
                }

                .main-content {
                    flex: 1;
                    margin-left: var(--sidebar-width);
                    padding: 2rem;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 3rem;
                }

                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-weight: 500;
                    color: var(--text-dark);
                }

                .logout-btn:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .dashboard-welcome {
                    background: white;
                    padding: 3rem 2rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .dashboard-welcome h2 {
                    color: var(--text-dark);
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .dashboard-welcome p {
                    color: #64748b;
                    font-size: 1.1rem;
                }

                @media (max-width: 768px) {
                    .admin-dashboard {
                        flex-direction: column;
                    }

                    .sidebar {
                        position: static;
                        width: 100%;
                        height: auto;
                        box-shadow: none;
                        border-bottom: 2px solid #f1f5f9;
                    }

                    .main-content {
                        margin-left: 0;
                        padding: 1.5rem;
                    }

                    .sidebar-nav {
                        flex-direction: row;
                        overflow-x: auto;
                    }

                    .nav-item {
                        flex-direction: column;
                        text-align: center;
                        padding: 1rem;
                    }

                    .nav-icon {
                        margin-right: 0;
                        margin-bottom: 0.5rem;
                    }

                    .nav-text {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
