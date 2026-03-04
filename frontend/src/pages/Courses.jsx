import React from "react";

const courses = [
    { title: "Full Stack Developer", provider: "Coursera", learners: 124, rating: 4.6, url: "https://www.coursera.org/" },
    { title: "Data Science Professional", provider: "IBM Skills", learners: 98, rating: 4.7, url: "https://www.ibm.com/training" },
    { title: "Cybersecurity Foundations", provider: "Google", learners: 76, rating: 4.5, url: "https://www.google.com/" },
    { title: "UI/UX Design Sprint", provider: "Figma", learners: 54, rating: 4.4, url: "https://www.figma.com/" },
    { title: "Cloud DevOps Engineer", provider: "AWS", learners: 88, rating: 4.6, url: "https://aws.amazon.com/training/" },
];

export default function Courses() {
    return (
        <div className="page-content">
            <div className="dashboard-title-section">
                <h1>Courses</h1>
                <p>Popular learning paths students are enrolled in right now.</p>
            </div>

            <div className="card">
                <div className="suggested-course-list" style={{ gap: 12 }}>
                    {courses.map((course, idx) => (
                        <div className="suggested-course-item" key={idx} style={{ cursor: "pointer" }}>
                            <div className="course-platform-icon coursera">
                                {course.provider[0]}
                            </div>
                            <div className="sc-info">
                                <h4>{course.title}</h4>
                                <div className="sc-subtitle">Provider: {course.provider}</div>
                                <div className="sc-meta">
                                    <span>👥 {course.learners} learners</span>
                                    <span style={{ marginLeft: 10 }}>★ {course.rating}</span>
                                </div>
                            </div>
                            <div
                                className="sc-learn-btn"
                                onClick={() => window.open(course.url, "_blank")}
                            >
                                View
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
