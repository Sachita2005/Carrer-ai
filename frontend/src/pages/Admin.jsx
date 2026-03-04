import React from "react";

const tasks = [
    { title: "Approve new instructors", due: "Today", owner: "System", status: "Pending" },
    { title: "Review security logs", due: "Today", owner: "Security Bot", status: "In Progress" },
    { title: "Backup Mongo cluster", due: "Tomorrow", owner: "Ops", status: "Scheduled" },
    { title: "Publish newsletter", due: "Friday", owner: "Content", status: "Pending" },
];

export default function Admin() {
    return (
        <div className="page-content">
            <div className="dashboard-title-section">
                <h1>Admin</h1>
                <p>Operational tasks and platform upkeep at a glance.</p>
            </div>

            <div className="grid-2">
                <div className="card">
                    <h3 style={{ marginBottom: 12 }}>Open Tasks</h3>
                    <div className="professional-list">
                        {tasks.map((t, idx) => (
                            <div key={idx} className="professional-row" style={{ borderBottom: "1px solid var(--bg-secondary)" }}>
                                <div className="pro-avatar" style={{ background: "rgba(31,157,255,0.12)", color: "#0f74c9" }}>
                                    {t.title[0]}
                                </div>
                                <div className="pro-info">
                                    <h4>{t.title}</h4>
                                    <p>{t.owner} • Due {t.due}</p>
                                </div>
                                <span className="pro-view-btn" style={{ background: "rgba(49,215,196,0.15)", color: "#158f74" }}>
                                    {t.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 12 }}>System Health</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        {[
                            { label: "APIs", value: "✅ Healthy" },
                            { label: "Latency", value: "142 ms" },
                            { label: "Error Rate", value: "0.21%" },
                            { label: "Uptime", value: "99.97%" },
                        ].map((item, idx) => (
                            <div key={idx} className="card" style={{ padding: 14 }}>
                                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</div>
                                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
