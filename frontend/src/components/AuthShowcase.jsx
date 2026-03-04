import React from "react";

const AuthShowcase = ({ badge, title, description }) => {
    return (
        <aside className="auth-showcase" aria-hidden="true">
            <span className="auth-pill">{badge}</span>
            <h2>{title}</h2>
            <p>{description}</p>

            <div className="auth-showcase-graphic">
                <div className="graphic-glow graphic-glow-a" />
                <div className="graphic-glow graphic-glow-b" />
                <svg viewBox="0 0 320 220" role="presentation">
                    <defs>
                        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#31d7c4" />
                            <stop offset="100%" stopColor="#2f87ff" />
                        </linearGradient>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fff6c7" />
                            <stop offset="100%" stopColor="#ffd7a3" />
                        </linearGradient>
                    </defs>

                    <rect x="18" y="22" width="284" height="170" rx="18" fill="rgba(255,255,255,0.09)" />
                    <rect x="38" y="45" width="124" height="82" rx="14" fill="url(#cardGrad)" />
                    <rect x="176" y="45" width="106" height="16" rx="8" fill="rgba(255,255,255,0.8)" />
                    <rect x="176" y="71" width="90" height="10" rx="5" fill="rgba(255,255,255,0.55)" />
                    <rect x="176" y="89" width="76" height="10" rx="5" fill="rgba(255,255,255,0.4)" />
                    <rect x="176" y="107" width="58" height="10" rx="5" fill="rgba(255,255,255,0.3)" />

                    <path d="M50 156 C80 132, 112 170, 144 146 C176 122, 208 168, 246 144" fill="none" stroke="url(#lineGrad)" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="50" cy="156" r="5" fill="#fff6c7" />
                    <circle cx="144" cy="146" r="5" fill="#fff6c7" />
                    <circle cx="246" cy="144" r="5" fill="#fff6c7" />
                </svg>
            </div>

            <ul className="auth-showcase-list">
                <li>Personalized career roadmaps</li>
                <li>Smart resume and interview guidance</li>
                <li>Actionable skill-gap recommendations</li>
            </ul>
        </aside>
    );
};

export default AuthShowcase;

