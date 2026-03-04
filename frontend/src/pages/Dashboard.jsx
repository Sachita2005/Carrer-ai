import React, { useEffect, useState } from 'react';

export default function Dashboard({ setActivePage, userRecommendation }) {
    const [animationTrigger, setAnimationTrigger] = useState(false);

    useEffect(() => {
        setAnimationTrigger(true);
    }, []);

    const defaultCategories = [
        { title: 'Full Stack\nDeveloper', desc: 'High demand in IT', icon: '💻', color: 'purple', id: 'web-javascript', url: 'https://www.coursera.org/specializations/full-stack-react' },
        { title: 'Data\nScientist', desc: 'Growing field in analytics', icon: '📊', color: 'green', id: 'ai-data', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
        { title: 'Cyber\nSecurity', desc: 'High security jobs value', icon: '🛡️', color: 'orange', id: 'security-networking', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
        { title: 'UI / UX\nDesigner', desc: 'Creative + tech career', icon: '🎨', color: 'purple', id: 'design-communication', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
    ];

    const defaultProfessionals = [
        { name: 'Rajesh Varma', role: 'Full Stack Developer', online: true, url: 'https://www.linkedin.com/in/wesbos/' },
        { name: 'Sneha Menon', role: 'Data Scientist, IBM', online: true, url: 'https://www.linkedin.com/in/mrogati/' },
        { name: 'Arjun Patel', role: 'CyberSecurity Analyst, TCS', online: true, url: 'https://www.linkedin.com/in/troyhunt/' },
        { name: 'Priya Suresh', role: 'UI / UX Designer, Google', online: true, url: 'https://www.linkedin.com/in/juliezhuo/' },
        { name: 'Vaigurana', role: 'Career, Indert, Atreet A', online: true, url: 'https://www.linkedin.com' },
        { name: 'Steven Ateesl', role: 'Zettal attnager', online: true, url: 'https://www.linkedin' },
        { name: 'Vanjirfa Kakdey', role: 'Propect, designs', online: true, url: 'https://www.linkedin' },
    ];

    const defaultCourses = [
        { title: 'Full Stack Development', desc: 'High demand in IT industry', platform: 'Coursera', iconClass: 'coursera', url: 'https://www.coursera.org/specializations/full-stack-react' },
        { title: 'AI & Machine Learning', desc: 'Future-ready career', platform: 'Udemy', iconClass: 'udemy', url: 'https://www.udemy.com' },
        { title: 'Cyber Security', desc: 'High security jobs', platform: 'Google', iconClass: 'coursera', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
        { title: 'UI / UX Design', desc: 'Creative + tech career', platform: 'edX', iconClass: 'edx', url: 'https://www.edx.org' },
        { title: 'Data Science', desc: 'Good scope in AI, analytics', platform: 'Coursera', iconClass: 'coursera', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
    ];

    const professionals = userRecommendation?.professionals
        ? userRecommendation.professionals.map(p => ({ name: p.name, role: p.title, online: true, url: p.url }))
        : defaultProfessionals;

    const courses = userRecommendation?.courses
        ? userRecommendation.courses.map(c => ({
            title: c.title,
            desc: `Master ${c.title} on ${c.platform}`,
            platform: c.platform,
            iconClass: c.platform.toLowerCase().includes('coursera') ? 'coursera' :
                c.platform.toLowerCase().includes('udemy') ? 'udemy' :
                    c.platform.toLowerCase().includes('edx') ? 'edx' : 'linkedin',
            url: c.url
        }))
        : defaultCourses;

    const getPlatformIcon = (platform) => {
        if (platform.toLowerCase().includes('coursera')) return 'C';
        if (platform.toLowerCase().includes('udemy')) return 'U';
        if (platform.toLowerCase().includes('edx')) return 'e';
        if (platform.toLowerCase().includes('google')) return 'G';
        return 'L';
    };

    const getInitial = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2);
    };

    return (
        <div className="page-content">
            <div className={`dashboard-title-section ${animationTrigger ? 'animate-slide-in' : ''}`}>
                <h1>{userRecommendation ? `Your Personalized Path: ${userRecommendation.career}` : 'Career & Course Recommendations'} 🎯</h1>
                <p>{userRecommendation
                    ? `Based on your interest in ${userRecommendation.received.interest} and skill in ${userRecommendation.received.skill}, we've curated these steps for you.`
                    : 'Based on the provided information and skills, here are tailored course suggestions for career advancement.'
                }
                </p>
            </div>

            {/* Categories Row */}
            <div className="career-categories-row" style={{ animationDelay: '0.1s' }}>
                {defaultCategories.map((cat, idx) => (
                    <div className="career-category-card animate-scale-in" key={idx}
                        style={{
                            animationDelay: `${0.1 + idx * 0.05}s`,
                            border: userRecommendation?.career === cat.title.replace('\n', ' ') ? '2px solid var(--primary)' : '1px solid var(--border)',
                            background: userRecommendation?.career === cat.title.replace('\n', ' ') ? 'var(--primary-ultra-light)' : 'var(--bg-card)'
                        }}
                        onClick={() => window.location.href = cat.url}
                    >
                        <div className={`cat-icon ${cat.color}`}>{cat.icon}</div>
                        <div className="cat-info">
                            <h3 style={{ whiteSpace: 'pre-line' }}>{cat.title}</h3>
                            <p>{cat.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Grid */}
            <div className="grid-2" style={{ marginBottom: '24px' }}>
                {/* Professionals */}
                <div className="professionals-section animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <div className="section-title">
                        <h2>{userRecommendation ? `${userRecommendation.career} Professionals` : 'Linkedin Professionals'}</h2>
                        <a href="https://www.linkedin.com" rel="noopener noreferrer">View All ›</a>
                    </div>
                    <div className="professional-list">
                        {professionals.map((pro, idx) => (
                            <a href={pro.url} className="professional-row" key={idx} style={{ textDecoration: 'none' }}>
                                <div className="pro-avatar" style={{ position: 'relative' }}>
                                    {getInitial(pro.name)}
                                    {pro.online && <div className="pro-online-dot"></div>}
                                </div>
                                <div className="pro-info">
                                    <h4>{pro.name}</h4>
                                    <p>{pro.role}</p>
                                </div>
                                <div className="pro-actions">
                                    <span className="pro-view-btn">View</span>
                                    <span className="pro-search-btn">🔍</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Courses */}
                <div className="courses-section animate-slide-in" style={{ animationDelay: '0.3s' }}>
                    <div className="section-title">
                        <h2>{userRecommendation ? `Top Courses for ${userRecommendation.career}` : 'Suggested Courses'}</h2>
                    </div>
                    <div className="suggested-course-list">
                        {courses.map((course, idx) => (
                            <a href={course.url} className="suggested-course-item" key={idx} target="_blank" rel="noopener noreferrer">
                                <div className={`course-platform-icon ${course.iconClass}`}>
                                    {getPlatformIcon(course.platform)}
                                </div>
                                <div className="sc-info">
                                    <h4>{course.title}</h4>
                                    <div className="sc-subtitle">{course.desc}</div>
                                    <div className="sc-meta">
                                        <span>➔</span> Course provider: {course.platform}
                                    </div>
                                </div>
                                <div className="sc-learn-btn">Learn Now ›</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Profile Recommendations */}
            <div className="profile-recommendation animate-slide-in" style={{ animationDelay: '0.4s' }}>
                <div className="rec-header">
                    <span className="bolt-icon">⚡</span>
                    {userRecommendation
                        ? `A detailed analysis of your path to becoming a ${userRecommendation.career}.`
                        : 'Based on your profile, the following careers & courses are recommended.'
                    }
                </div>

                <div className="rec-grid">
                    {/* Skilly Chart */}
                    <div className="skills-chart">
                        <h3>Your Interest Match</h3>
                        <div className="chart-container">
                            {(userRecommendation?.requiredSkills
                                ? userRecommendation.requiredSkills.map(s => ({ label: s, value: Math.floor(Math.random() * 20) + 75, color: '#6C63FF', height: `${Math.floor(Math.random() * 20) + 70}%` }))
                                : [
                                    { label: 'Coding', value: 99, color: '#36B37E', height: '94%' },
                                    { label: 'Data Analysis', value: 78, color: '#36B37E', height: '70%' },
                                    { label: 'Cybersects', value: 70, color: '#36B37E', height: '65%' },
                                    { label: 'HTML CSS', value: 70, color: '#36B37E', height: '65%' },
                                    { label: 'AI / ML', value: 86, color: '#36B37E', height: '80%' },
                                    { label: 'UI / UX', value: 65, color: '#36B37E', height: '60%' }
                                ]
                            ).map((col, idx) => (
                                <div className="chart-bar-wrapper" key={idx}>
                                    <div className="chart-bar" style={{ height: col.height, background: col.color }}>
                                        <div className="bar-value">{col.value}</div>
                                    </div>
                                    <div className="chart-bar-label">
                                        {col.label.split(' ').map((w, i) => <div key={i}>{w}</div>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Most Suitable Career */}
                    <div className="suitable-career-card">
                        <h3>Most Suitable Career</h3>
                        <div className="career-name">{userRecommendation ? userRecommendation.career : 'Full Stack Developer'}</div>
                        <div className="career-industry">
                            <div className="industry-icon">💻</div>
                            {userRecommendation ? 'Top Industry Match' : 'Current - tech industry'}
                        </div>
                        <div className="suitable-career-details">
                            {userRecommendation
                                ? userRecommendation.description
                                : 'Master the complete web development cycle and build scalable end-to-end applications used by millions.'
                            }
                        </div>
                        <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                            <button className="sc-learn-btn"
                                style={{ padding: '10px 20px', fontSize: '14px' }}
                                onClick={() => {
                                    if (userRecommendation && courses.length > 0) {
                                        window.open(courses[0].url, '_blank');
                                    } else {
                                        setActivePage('career');
                                    }
                                }}
                            >
                                {userRecommendation ? 'Learn Now ›' : 'Find My Path ›'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
