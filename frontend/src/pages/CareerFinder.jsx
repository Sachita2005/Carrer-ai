import React, { useState } from 'react';
import { API_URL } from '../config/api';

const interestOptions = [
    { value: '', label: 'Select your interest...' },
    { value: 'ai', label: '🤖 Artificial Intelligence' },
    { value: 'data', label: '📊 Data Science & Analytics' },
    { value: 'web', label: '🌐 Web Development' },
    { value: 'design', label: '🎨 Design (UI/UX / Graphic)' },
    { value: 'security', label: '🔐 Cybersecurity' },
    { value: 'cloud', label: '☁️ Cloud Computing & DevOps' },
    { value: 'mobile', label: '📱 Mobile App Development' },
    { value: 'business', label: '📋 Business & Product Management' },
];

const skillOptions = [
    { value: '', label: 'Select your skill...' },
    { value: 'python', label: '🐍 Python' },
    { value: 'javascript', label: '📜 JavaScript' },
    { value: 'java', label: '☕ Java' },
    { value: 'data', label: '📈 Data Analysis / Excel' },
    { value: 'communication', label: '🗣️ Communication & Leadership' },
    { value: 'creativity', label: '✏️ Creativity & Graphic Skills' },
    { value: 'networking', label: '🔗 Networking & Linux' },
    { value: 'linux', label: '🖥️ Linux & System Admin' },
    { value: 'swift', label: '🍎 Swift / iOS' },
    { value: 'coding', label: '💻 General Coding' },
];

const platformColors = {
    Coursera: { bg: 'rgba(0, 86, 210, 0.12)', color: '#4FC3F7', icon: '🎓' },
    edX: { bg: 'rgba(2, 91, 80, 0.12)', color: '#00D4AA', icon: '📚' },
    Udemy: { bg: 'rgba(163, 101, 214, 0.12)', color: '#B39DDB', icon: '🎯' },
    'LinkedIn Learning': { bg: 'rgba(0, 119, 181, 0.12)', color: '#4FC3F7', icon: '💼' },
    'Hacking with Swift': { bg: 'rgba(255, 107, 157, 0.12)', color: '#FF6B9D', icon: '🍎' },
    default: { bg: 'rgba(108, 99, 255, 0.12)', color: '#8B85FF', icon: '🌐' }
};

function getPlatformStyle(platform) {
    return platformColors[platform] || platformColors.default;
}

export default function CareerFinder({ setUserRecommendation, setActivePage }) {
    const [interest, setInterest] = useState('');
    const [skill, setSkill] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleRecommend = async () => {
        if (!interest || !skill) {
            setError('Please select both your interest and skill.');
            return;
        }
        setError('');
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch(
                `${API_URL}/career/recommend?interest=${encodeURIComponent(interest)}&skill=${encodeURIComponent(skill)}`
            );
            const data = await res.json();
            setResult(data);
            if (setUserRecommendation) {
                setUserRecommendation(data);
            }
        } catch (err) {
            setError('Failed to connect to the server. Make sure the backend is running and VITE_API_URL is correct.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-content">
            <div className="grid-2">
                {/* Left Panel - Form */}
                <div>
                    <div className="card mb-24">
                        <div className="section-header">
                            <h2>
                                <div className="section-icon">🎯</div>
                                Find Your Career
                            </h2>
                        </div>
                        <p className="text-secondary mb-20" style={{ fontSize: 13, lineHeight: 1.6 }}>
                            Select your primary interest and strongest skill. Our AI-powered engine will
                            recommend the most suitable career path with courses and industry professionals.
                        </p>

                        <div className="form-group">
                            <label htmlFor="interest-select">Your Interest Area</label>
                            <select
                                id="interest-select"
                                className="form-select"
                                value={interest}
                                onChange={e => setInterest(e.target.value)}
                            >
                                {interestOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="skill-select">Your Strongest Skill</label>
                            <select
                                id="skill-select"
                                className="form-select"
                                value={skill}
                                onChange={e => setSkill(e.target.value)}
                            >
                                {skillOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        {error && (
                            <div style={{
                                background: 'rgba(255, 107, 157, 0.1)',
                                border: '1px solid rgba(255, 107, 157, 0.3)',
                                color: '#FF6B9D',
                                padding: '12px 16px',
                                borderRadius: 10,
                                fontSize: 13,
                                marginBottom: 16,
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            id="btn-get-recommendation"
                            className="btn btn-primary btn-full"
                            onClick={handleRecommend}
                            disabled={loading}
                        >
                            {loading ? '⏳ Analyzing...' : '🚀 Get My Career Recommendation'}
                        </button>
                    </div>

                    {/* How It Works */}
                    <div className="card">
                        <div className="section-header">
                            <h2>
                                <div className="section-icon">💡</div>
                                How It Works
                            </h2>
                        </div>
                        {[
                            { step: '01', text: 'Select your interest and skill from the dropdowns' },
                            { step: '02', text: 'Our AI engine matches you to the best career path' },
                            { step: '03', text: 'Get curated courses from Coursera, edX, Udemy & more' },
                            { step: '04', text: 'Connect with LinkedIn professionals in your field' },
                        ].map(item => (
                            <div key={item.step} style={{
                                display: 'flex', gap: 14, alignItems: 'flex-start',
                                marginBottom: 14,
                            }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    background: 'rgba(108,99,255,0.15)',
                                    border: '1px solid rgba(108,99,255,0.3)',
                                    color: 'var(--primary-light)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                                }}>
                                    {item.step}
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, paddingTop: 6 }}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Result */}
                <div>
                    {!result && !loading && (
                        <div className="card" style={{ height: '100%' }}>
                            <div className="empty-state">
                                <div className="empty-icon">🎯</div>
                                <h3>Your Career Recommendation</h3>
                                <p>Fill in your interest and skill on the left to get a personalized career recommendation with courses and mentors.</p>
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="card" style={{ height: '100%' }}>
                            <div className="empty-state">
                                <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
                                <h3>Analyzing Your Profile...</h3>
                                <p>Our AI engine is finding the perfect career match for you.</p>
                                <div className="loading-dots" style={{ justifyContent: 'center', marginTop: 16 }}>
                                    <span /><span /><span />
                                </div>
                            </div>
                        </div>
                    )}

                    {result && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* Career Result */}
                            <div className="result-panel">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <div style={{
                                        background: 'var(--gradient-primary)', borderRadius: 12,
                                        width: 48, height: 48, display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: 22, flexShrink: 0,
                                        boxShadow: 'var(--shadow-glow)',
                                    }}>🎯</div>
                                    <div>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                                            Recommended Career
                                        </p>
                                        <div className="result-title">{result.career}</div>
                                    </div>
                                </div>
                                <p className="result-description">{result.description}</p>

                                {/* Required Skills */}
                                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                                    Key Skills to Master
                                </p>
                                <div className="skills-container">
                                    {result.requiredSkills?.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Courses */}
                            <div className="card">
                                <div className="section-header">
                                    <h2>
                                        <div className="section-icon">📚</div>
                                        Recommended Courses
                                    </h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {result.courses?.map((course, idx) => {
                                        const style = getPlatformStyle(course.platform);
                                        return (
                                            <a
                                                key={idx}
                                                href={course.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="course-card"
                                                id={`course-link-${idx}`}
                                            >
                                                <div className="course-icon" style={{ background: style.bg, fontSize: 20 }}>
                                                    {style.icon}
                                                </div>
                                                <div className="course-info">
                                                    <h4>{course.title}</h4>
                                                    <p style={{ color: style.color }}>{course.platform}</p>
                                                </div>
                                                <span className="course-arrow">→</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* LinkedIn Professionals */}
                            <div className="card">
                                <div className="section-header">
                                    <h2>
                                        <div className="section-icon">💼</div>
                                        LinkedIn Professionals
                                    </h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {result.professionals?.map((pro, idx) => (
                                        <a
                                            key={idx}
                                            href={pro.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="professional-card"
                                            id={`pro-link-${idx}`}
                                        >
                                            <div className="professional-avatar">
                                                {pro.name.charAt(0)}
                                            </div>
                                            <div className="professional-info">
                                                <h4>{pro.name}</h4>
                                                <p>{pro.title}</p>
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
