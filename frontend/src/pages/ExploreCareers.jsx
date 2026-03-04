import React, { useState } from 'react';

const allCareers = [
    {
        emoji: '🤖',
        title: 'AI Engineer',
        description: 'Design and build intelligent systems that can learn and adapt.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
        salary: '$120K – $180K',
        demand: 'Very High',
        demandColor: '#00D4AA',
        courses: [
            { name: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', platform: 'Coursera' },
            { name: 'Machine Learning by Andrew Ng', url: 'https://www.coursera.org/learn/machine-learning', platform: 'Coursera' },
        ],
        professionals: [
            { name: 'Andrew Ng', url: 'https://www.linkedin.com/in/andrewyng/' },
            { name: 'Yann LeCun', url: 'https://www.linkedin.com/in/yann-lecun-0b999/' },
        ],
    },
    {
        emoji: '📊',
        title: 'Data Scientist',
        description: 'Analyze complex data to drive data-driven business decisions.',
        skills: ['Python', 'R', 'Statistics', 'ML', 'Tableau'],
        salary: '$95K – $150K',
        demand: 'Very High',
        demandColor: '#00D4AA',
        courses: [
            { name: 'IBM Data Science Certificate', url: 'https://www.coursera.org/professional-certificates/ibm-data-science', platform: 'Coursera' },
        ],
        professionals: [
            { name: 'DJ Patil', url: 'https://www.linkedin.com/in/dj-patil-b56a4/' },
        ],
    },
    {
        emoji: '🌐',
        title: 'Full Stack Developer',
        description: 'Build complete web applications from front-end to back-end.',
        skills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'REST APIs'],
        salary: '$90K – $140K',
        demand: 'High',
        demandColor: '#4FC3F7',
        courses: [
            { name: 'The Web Developer Bootcamp', url: 'https://www.udemy.com/course/the-web-developer-bootcamp/', platform: 'Udemy' },
            { name: 'Full Stack Open', url: 'https://fullstackopen.com/en/', platform: 'University of Helsinki' },
        ],
        professionals: [
            { name: 'Wes Bos', url: 'https://www.linkedin.com/in/wesbos/' },
            { name: 'Kent C. Dodds', url: 'https://www.linkedin.com/in/kentcdodds/' },
        ],
    },
    {
        emoji: '🎨',
        title: 'UI/UX Designer',
        description: 'Create beautiful, user-centered digital experiences and interfaces.',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
        salary: '$70K – $120K',
        demand: 'High',
        demandColor: '#4FC3F7',
        courses: [
            { name: 'Google UX Design Certificate', url: 'https://www.coursera.org/professional-certificates/google-ux-design', platform: 'Coursera' },
        ],
        professionals: [
            { name: 'Julie Zhuo', url: 'https://www.linkedin.com/in/juliezhuo/' },
        ],
    },
    {
        emoji: '🔐',
        title: 'Cybersecurity Analyst',
        description: 'Protect digital assets and systems from threats and attacks.',
        skills: ['Networking', 'Ethical Hacking', 'SIEM', 'Penetration Testing', 'Linux'],
        salary: '$85K – $140K',
        demand: 'Very High',
        demandColor: '#00D4AA',
        courses: [
            { name: 'Google Cybersecurity Certificate', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', platform: 'Coursera' },
        ],
        professionals: [
            { name: 'Bruce Schneier', url: 'https://www.linkedin.com/in/bruce-schneier-4b90b7/' },
        ],
    },
    {
        emoji: '☁️',
        title: 'Cloud Engineer',
        description: 'Design, build, and manage cloud infrastructure and services.',
        skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
        salary: '$110K – $160K',
        demand: 'Very High',
        demandColor: '#00D4AA',
        courses: [
            { name: 'AWS Solutions Architect', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', platform: 'AWS' },
        ],
        professionals: [
            { name: 'Kelsey Hightower', url: 'https://www.linkedin.com/in/kelsey-hightower-849b9823/' },
        ],
    },
    {
        emoji: '📱',
        title: 'Android Developer',
        description: 'Build native Android mobile applications for billions of users.',
        skills: ['Kotlin', 'Java', 'Android SDK', 'Firebase', 'Jetpack Compose'],
        salary: '$85K – $130K',
        demand: 'High',
        demandColor: '#4FC3F7',
        courses: [
            { name: 'Android Developer Course', url: 'https://developer.android.com/courses', platform: 'Google' },
        ],
        professionals: [
            { name: 'Jake Wharton', url: 'https://www.linkedin.com/in/jakewharton/' },
        ],
    },
    {
        emoji: '🍎',
        title: 'iOS Developer',
        description: 'Build seamless iOS and macOS applications for Apple devices.',
        skills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Core Data'],
        salary: '$90K – $145K',
        demand: 'High',
        demandColor: '#4FC3F7',
        courses: [
            { name: '100 Days of SwiftUI', url: 'https://www.hackingwithswift.com/100/swiftui', platform: 'Hacking with Swift' },
        ],
        professionals: [
            { name: 'Paul Hudson', url: 'https://www.linkedin.com/in/paulhudsonuk/' },
        ],
    },
    {
        emoji: '⚙️',
        title: 'DevOps Engineer',
        description: 'Bridge development and operations with automation and CI/CD.',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform', 'Monitoring'],
        salary: '$100K – $155K',
        demand: 'Very High',
        demandColor: '#00D4AA',
        courses: [
            { name: 'Docker & Kubernetes', url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', platform: 'Udemy' },
        ],
        professionals: [
            { name: 'Werner Vogels', url: 'https://www.linkedin.com/in/wernervogels/' },
        ],
    },
    {
        emoji: '📋',
        title: 'Product Manager',
        description: 'Define product vision and lead cross-functional teams.',
        skills: ['Agile', 'Roadmapping', 'User Research', 'Data Analysis', 'Leadership'],
        salary: '$90K – $145K',
        demand: 'High',
        demandColor: '#4FC3F7',
        courses: [
            { name: 'Google Project Management', url: 'https://www.coursera.org/professional-certificates/google-project-management', platform: 'Coursera' },
        ],
        professionals: [
            { name: 'Marty Cagan', url: 'https://www.linkedin.com/in/martycagan/' },
        ],
    },
    {
        emoji: '📈',
        title: 'Data Analyst',
        description: 'Transform data into actionable business insights.',
        skills: ['SQL', 'Excel', 'Python', 'Power BI', 'Tableau', 'Statistics'],
        salary: '$65K – $110K',
        demand: 'High',
        demandColor: '#4FC3F7',
        courses: [
            { name: 'Google Data Analytics', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', platform: 'Coursera' },
        ],
        professionals: [
            { name: 'Julia Silge', url: 'https://www.linkedin.com/in/juliasilge/' },
        ],
    },
    {
        emoji: '🖌️',
        title: 'Graphic Designer',
        description: 'Create compelling visual content for digital and print media.',
        skills: ['Photoshop', 'Illustrator', 'Typography', 'Branding', 'Color Theory'],
        salary: '$50K – $90K',
        demand: 'Moderate',
        demandColor: '#FECA57',
        courses: [
            { name: 'Graphic Design Masterclass', url: 'https://www.udemy.com/course/graphic-design-masterclass/', platform: 'Udemy' },
        ],
        professionals: [
            { name: 'Paula Scher', url: 'https://www.linkedin.com/in/paulascher/' },
        ],
    },
];

export default function ExploreCareers() {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? allCareers :
        filter === 'very-high' ? allCareers.filter(c => c.demand === 'Very High') :
            allCareers.filter(c => c.demand === filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()));

    return (
        <div className="page-content">
            {/* Filter tabs */}
            <div className="tabs">
                {[
                    { id: 'all', label: '🌐 All Careers' },
                    { id: 'very-high', label: '🔥 High Demand' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={`tab ${filter === tab.id ? 'active' : ''}`}
                        onClick={() => setFilter(tab.id)}
                        id={`filter-${tab.id}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid-2">
                {/* Career List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filtered.map((career, idx) => (
                        <div
                            key={idx}
                            className="card"
                            style={{
                                cursor: 'pointer',
                                border: selected?.title === career.title
                                    ? '1px solid var(--primary)'
                                    : '1px solid var(--border)',
                                background: selected?.title === career.title
                                    ? 'rgba(108,99,255,0.08)'
                                    : 'var(--bg-card)',
                            }}
                            onClick={() => setSelected(career)}
                            id={`explore-career-${idx}`}
                            role="button"
                            tabIndex={0}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <span style={{ fontSize: 28 }}>{career.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                                        {career.title}
                                    </h3>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                                        {career.description}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ fontSize: 11, color: career.demandColor, fontWeight: 600, marginBottom: 2 }}>
                                        {career.demand}
                                    </p>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{career.salary}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Career Detail */}
                <div>
                    {!selected ? (
                        <div className="card" style={{ height: '100%' }}>
                            <div className="empty-state">
                                <div className="empty-icon">🌐</div>
                                <h3>Select a Career</h3>
                                <p>Click on any career on the left to see detailed information, required skills, courses, and mentors.</p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 100 }}>
                            <div className="result-panel">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <span style={{ fontSize: 40 }}>{selected.emoji}</span>
                                    <div>
                                        <div className="result-title">{selected.title}</div>
                                        <p style={{ fontSize: 12, color: selected.demandColor, fontWeight: 600 }}>
                                            {selected.demand} Demand · {selected.salary}
                                        </p>
                                    </div>
                                </div>
                                <p className="result-description">{selected.description}</p>

                                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                                    Required Skills
                                </p>
                                <div className="skills-container">
                                    {selected.skills.map((s, i) => (
                                        <span key={i} className="skill-tag">{s}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Courses */}
                            <div className="card">
                                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                                    📚 Start Learning
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {selected.courses.map((course, i) => (
                                        <a
                                            key={i}
                                            href={course.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="course-card"
                                        >
                                            <div className="course-icon">🎓</div>
                                            <div className="course-info">
                                                <h4>{course.name}</h4>
                                                <p>{course.platform}</p>
                                            </div>
                                            <span className="course-arrow">→</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Professionals */}
                            <div className="card">
                                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                                    💼 Connect on LinkedIn
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {selected.professionals.map((pro, i) => (
                                        <a
                                            key={i}
                                            href={pro.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="professional-card"
                                        >
                                            <div className="professional-avatar">{pro.name.charAt(0)}</div>
                                            <div className="professional-info">
                                                <h4>{pro.name}</h4>
                                                <p>View LinkedIn Profile →</p>
                                            </div>
                                            <span className="linkedin-badge">in</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
