import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CareerFinder from './pages/CareerFinder';
import Chatbot from './pages/Chatbot';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ExploreCareers from './pages/ExploreCareers';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px'
            }}>
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

// Main App Layout Component
const AppLayout = ({ activePage, setActivePage, userRecommendation, setUserRecommendation }) => {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(() =>
        typeof window !== 'undefined' ? window.innerWidth > 900 : true
    );
    const [isMobileView, setIsMobileView] = React.useState(() =>
        typeof window !== 'undefined' ? window.innerWidth <= 900 : false
    );

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 900px)');

        const handleViewportChange = () => {
            const mobile = mediaQuery.matches;
            setIsMobileView(mobile);
            setIsSidebarOpen(!mobile);
        };

        handleViewportChange();
        mediaQuery.addEventListener('change', handleViewportChange);
        return () => mediaQuery.removeEventListener('change', handleViewportChange);
    }, []);

    const handleSidebarToggle = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        if (isMobileView) {
            setIsSidebarOpen(false);
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard setActivePage={handlePageChange} userRecommendation={userRecommendation} />;
            case 'career': return <CareerFinder setUserRecommendation={setUserRecommendation} setActivePage={handlePageChange} />;
            case 'chatbot': return <Chatbot />;
            case 'resume': return <ResumeAnalyzer />;
            case 'explore': return <ExploreCareers />;
            case 'students': return <Students />;
            case 'courses': return <Courses />;
            case 'admin': return <Admin />;
            case 'reports': return <Reports />;
            case 'settings': return <Settings />;
            default: return <Dashboard setActivePage={setActivePage} />;
        }
    };

    return (
        <div className={`app-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'} ${isMobileView ? 'is-mobile' : ''}`}>
            {isMobileView && isSidebarOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    onClick={handleSidebarToggle}
                    aria-label="Close sidebar"
                />
            )}

            <Sidebar
                activePage={activePage}
                setActivePage={handlePageChange}
                isOpen={isSidebarOpen}
                onToggle={handleSidebarToggle}
                userName={user?.fullName}
            />
            <div className="main-content">
                <Header onMenuToggle={handleSidebarToggle} isMobileView={isMobileView} />
                {renderPage()}
            </div>
        </div>
    );
};

// Main App Component with Routing
export default function App() {
    const [activePage, setActivePage] = React.useState('dashboard');
    const [userRecommendation, setUserRecommendation] = React.useState(null);

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <AppLayout
                                    activePage={activePage}
                                    setActivePage={setActivePage}
                                    userRecommendation={userRecommendation}
                                    setUserRecommendation={setUserRecommendation}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback Route */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
