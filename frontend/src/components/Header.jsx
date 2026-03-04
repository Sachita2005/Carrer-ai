import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({ onMenuToggle, isMobileView }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    return (
        <header className="header">
            <div className="header-left">
                {isMobileView && (
                    <button
                        type="button"
                        className="header-menu-btn"
                        onClick={onMenuToggle}
                        aria-label="Toggle sidebar"
                    >
                        ☰
                    </button>
                )}

                <div className="header-avatar">AI</div>
                <h2>Welcome back, <span>{user?.fullName || "User"}</span></h2>
            </div>

            <div className="header-right">
                <div className="header-badge" onClick={() => window.location.reload()}>
                    Refresh Recommendations
                </div>

                <div className="user-menu">
                    <div
                        className="user-avatar"
                        onClick={() => setShowMenu(!showMenu)}
                        title="User menu"
                    >
                        {user?.fullName?.charAt(0) || "U"}
                    </div>

                    {showMenu && (
                        <div className="dropdown-menu">
                            <div className="user-info">
                                <p className="user-name">{user?.fullName}</p>
                                <p className="user-email">{user?.email}</p>
                            </div>

                            <div className="menu-divider" />

                            <button
                                onClick={handleSettingsClick}
                                className="menu-item"
                            >
                                Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="menu-item logout-item"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

