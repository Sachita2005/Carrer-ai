import React from "react";

const navItems = [
    { id: "dashboard", icon: "D", label: "Dashboard" },
    { id: "resume", icon: "CV", label: "Resume Analyzer" },
    { id: "students", icon: "S", label: "Students" },
    { id: "courses", icon: "C", label: "Courses" },
    { id: "chatbot", icon: "AI", label: "Chatbot" },
    { id: "admin", icon: "A", label: "Admin" },
    { id: "reports", icon: "R", label: "Reports" },
    { id: "settings", icon: "ST", label: "Settings" }
];

export default function Sidebar({ activePage, setActivePage, isOpen, onToggle, userName }) {
    return (
        <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            <div className="sidebar-logo">
                {isOpen && <div className="logo-icon">CA</div>}
                <div className="logo-text">
                    <h3>CareerAI</h3>
                    <p>Guidance Hub</p>
                </div>
                <button
                    type="button"
                    className="sidebar-toggle"
                    onClick={onToggle}
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? "<" : ">"}
                </button>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <button
                        type="button"
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? "active" : ""}`}
                        onClick={() => setActivePage(item.id)}
                        id={`nav-${item.id}`}
                        title={item.label}
                        data-tooltip={item.label}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">
                        {(userName || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                        <p className="user-name">{userName || "User"}</p>
                        <p className="user-role">Career Explorer</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
