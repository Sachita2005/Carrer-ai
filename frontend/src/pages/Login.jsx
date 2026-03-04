import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShowcase from '../components/AuthShowcase';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setErrors({
                submit: err.message || 'Login failed. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-layout">
                <AuthShowcase
                    badge="Member Access"
                    title="Welcome back to your growth dashboard"
                    description="Continue your journey with updated recommendations, smarter preparation, and practical next steps."
                />

                <div className="auth-card">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Login to your career guidance account</p>

                    {(error || errors.submit) && (
                        <div className="error-message">
                            {error || errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className={errors.email ? 'input-error' : ''}
                            />
                            {errors.email && (
                                <span className="field-error">{errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={errors.password ? 'input-error' : ''}
                            />
                            {errors.password && (
                                <span className="field-error">{errors.password}</span>
                            )}
                        </div>

                        <Link to="/forgot-password" className="forgot-password-link">
                            Forgot password?
                        </Link>

                        <button
                            type="submit"
                            disabled={loading}
                            className="auth-button"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account?{' '}
                        <Link to="/signup" className="auth-link">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
