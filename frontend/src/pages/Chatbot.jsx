import React, { useState, useRef, useEffect } from 'react';
import { API_URL } from '../config/api';

const suggestedQuestions = [
    'AI Engineer path',
    'Full Stack Developer',
    'UI/UX Designer skills',
    'Cybersecurity career',
    'Top certifications',
    'Resume tips',
    'Data Scientist salary',
    'Interview preparation',
];

const welcomeMessage = {
    role: 'bot',
    text: `👋 Hello! I'm your **AI Career Advisor**!

I can help you with:
• Career path recommendations
• Skills required for any tech role
• Resume and interview tips
• Salary insights across careers
• Best certifications and free courses

Try asking: "AI Engineer career path" or "How to become a Data Scientist?" 🚀`,
};

export default function Chatbot() {
    const [messages, setMessages] = useState([welcomeMessage]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text) => {
        const msgText = text || input.trim();
        if (!msgText || loading) return;

        setMessages(prev => [...prev, { role: 'user', text: msgText }]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msgText }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: '⚠️ Server connection failed. Please ensure the backend is running and VITE_API_URL is correct.',
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="page-content">
            <div className="grid-2">
                {/* Chatbot */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <div className="chatbot-container">
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-avatar">🤖</div>
                            <div className="chatbot-header-info">
                                <h3>AI Career Advisor</h3>
                                <p>Online & Ready to Help</p>
                            </div>
                            <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
                                {messages.length - 1} messages
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div className="chat-suggestions">
                            {suggestedQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    className="chat-suggestion-chip"
                                    onClick={() => sendMessage(q)}
                                    id={`suggestion-${idx}`}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    <div className="message-avatar">
                                        {msg.role === 'bot' ? '🤖' : 'S'}
                                    </div>
                                    <div className="message-bubble">
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="message bot">
                                    <div className="message-avatar">🤖</div>
                                    <div className="message-bubble">
                                        <div className="loading-dots">
                                            <span /><span /><span />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chat-input-area">
                            <input
                                id="chat-input"
                                type="text"
                                className="chat-input"
                                placeholder="Ask about any career path, skills, or interview tips..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                            />
                            <button
                                id="btn-send-message"
                                className="chat-send-btn"
                                onClick={() => sendMessage()}
                                disabled={loading || !input.trim()}
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Career Topics Grid */}
            <div className="card mt-24">
                <div className="section-header">
                    <h2>
                        <div className="section-icon">💡</div>
                        Career Topics I Know About
                    </h2>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: 12,
                }}>
                    {[
                        { emoji: '🤖', topic: 'AI Engineer' },
                        { emoji: '🧠', topic: 'Machine Learning' },
                        { emoji: '📊', topic: 'Data Scientist' },
                        { emoji: '🌐', topic: 'Web Developer' },
                        { emoji: '💻', topic: 'Full Stack Dev' },
                        { emoji: '🎨', topic: 'Frontend Dev' },
                        { emoji: '🖌️', topic: 'UI/UX Designer' },
                        { emoji: '🔐', topic: 'Cybersecurity' },
                        { emoji: '☁️', topic: 'Cloud Engineer' },
                        { emoji: '⚙️', topic: 'DevOps' },
                        { emoji: '📱', topic: 'Android Dev' },
                        { emoji: '🍎', topic: 'iOS Developer' },
                        { emoji: '📋', topic: 'Product Manager' },
                        { emoji: '📈', topic: 'Data Analyst' },
                        { emoji: '💡', topic: 'Programming Tips' },
                        { emoji: '📄', topic: 'Resume & Interview' },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            id={`topic-btn-${idx}`}
                            style={{
                                background: 'rgba(108,99,255,0.06)',
                                border: '1px solid rgba(108,99,255,0.15)',
                                borderRadius: 10,
                                padding: '12px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                color: 'var(--text-secondary)',
                                fontSize: 13,
                                fontWeight: 500,
                                fontFamily: 'Inter, sans-serif',
                                textAlign: 'left',
                            }}
                            onClick={() => sendMessage(item.topic)}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(108,99,255,0.12)';
                                e.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)';
                                e.currentTarget.style.color = 'var(--text-primary)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(108,99,255,0.06)';
                                e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{item.emoji}</span>
                            {item.topic}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

