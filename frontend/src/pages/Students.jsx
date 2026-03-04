import React from "react";

const students = [
    { name: "Ava Thompson", course: "Full Stack Developer", progress: "78%", status: "Active" },
    { name: "Leo Martinez", course: "Data Scientist", progress: "52%", status: "Active" },
    { name: "Priya Nair", course: "Cyber Security", progress: "34%", status: "Paused" },
    { name: "Marcus Lee", course: "AI/ML Engineer", progress: "91%", status: "Active" },
    { name: "Sara Chen", course: "UI/UX Designer", progress: "67%", status: "Active" },
    { name: "Noah Brooks", course: "Cloud DevOps", progress: "24%", status: "New" },
];

export default function Students() {
    return (
        <div className="page-content">
            <div className="dashboard-title-section">
                <h1>Students</h1>
                <p>Quick view of current learners and their progress.</p>
            </div>

            <div className="card">
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ textAlign: "left", color: "var(--text-secondary)", fontSize: 13 }}>
                                <th style={{ padding: "10px 8px" }}>Name</th>
                                <th style={{ padding: "10px 8px" }}>Course</th>
                                <th style={{ padding: "10px 8px" }}>Progress</th>
                                <th style={{ padding: "10px 8px" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s, idx) => (
                                <tr key={idx} style={{ borderTop: "1px solid var(--border)" }}>
                                    <td style={{ padding: "12px 8px", fontWeight: 600 }}>{s.name}</td>
                                    <td style={{ padding: "12px 8px" }}>{s.course}</td>
                                    <td style={{ padding: "12px 8px" }}>
                                        <div style={{ width: "100%", background: "var(--bg-secondary)", borderRadius: 8, height: 8 }}>
                                            <div
                                                style={{
                                                    width: s.progress,
                                                    height: 8,
                                                    borderRadius: 8,
                                                    background: "var(--gradient-primary)"
                                                }}
                                            />
                                        </div>
                                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.progress}</span>
                                    </td>
                                    <td style={{ padding: "12px 8px" }}>
                                        <span
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: 10,
                                                fontSize: 12,
                                                background:
                                                    s.status === "Active"
                                                        ? "rgba(49, 215, 196, 0.12)"
                                                        : s.status === "Paused"
                                                            ? "rgba(255, 157, 102, 0.16)"
                                                            : "rgba(79, 195, 247, 0.14)",
                                                color:
                                                    s.status === "Active"
                                                        ? "#158f74"
                                                        : s.status === "Paused"
                                                            ? "#c06c29"
                                                            : "#0f74c9"
                                            }}
                                        >
                                            {s.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
