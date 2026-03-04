import React from "react";

const metrics = [
    { label: "Active Students", value: 312, change: "+4.2%" },
    { label: "Courses in Progress", value: 86, change: "+2.1%" },
    { label: "Completions (30d)", value: 128, change: "+5.8%" },
    { label: "Avg. Session Time", value: "18m", change: "+1.4%" },
];

const trends = [
    { title: "Career interest: AI/ML", detail: "Up 9% week over week" },
    { title: "Resume analyzer usage", detail: "1,240 sessions this month" },
    { title: "Chatbot satisfaction", detail: "4.4 / 5 avg rating" },
    { title: "Top course", detail: "Cloud DevOps Engineer (AWS)" },
];

export default function Reports() {
    return (
        <div className="page-content">
            <div className="dashboard-title-section">
                <h1>Reports</h1>
                <p>Snapshot of platform performance and learner engagement.</p>
            </div>

            <div className="stats-row">
                {metrics.map((m, idx) => (
                    <div className="stat-card" key={idx}>
                        <div className="stat-icon teal">{m.label[0]}</div>
                        <div className="stat-content">
                            <h3>{m.value}</h3>
                            <p>{m.label} • {m.change}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <h3 style={{ marginBottom: 12 }}>Trends</h3>
                <div className="professional-list">
                    {trends.map((t, idx) => (
                        <div key={idx} className="professional-row" style={{ borderBottom: "1px solid var(--bg-secondary)" }}>
                            <div className="pro-avatar" style={{ background: "rgba(49,215,196,0.12)", color: "#158f74" }}>
                                {t.title[0]}
                            </div>
                            <div className="pro-info">
                                <h4>{t.title}</h4>
                                <p>{t.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
