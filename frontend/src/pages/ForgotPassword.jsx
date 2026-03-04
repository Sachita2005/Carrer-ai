import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShowcase from '../components/AuthShowcase';
import './Auth.css';

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get('token');
    const [step, setStep] = useState(resetToken ? 'reset' : 'request');
    const [formData, setFormData] = useState({
        email: '',
        token: resetToken || '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { forgotPassword, resetPassword, error } = useAuth();
    const navigate = useNavigate();

    const validateRequestForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        return newErrors;
    };

    const validateResetForm = () => {
        const newErrors = {};

        if (!formData.newPassword) {
            newErrors.newPassword = 'Password is required';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleRequestSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateRequestForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await forgotPassword(formData.email);
            setSuccessMessage(
                'Password reset link sent to your email. Check your inbox.'
            );
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setErrors({
                submit: err.message || 'Failed to send reset email',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateResetForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await resetPassword(
                formData.token,
                formData.newPassword,
                formData.confirmPassword
            );
            setSuccessMessage(
                'Password reset successfully! Redirecting to login...'
            );
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setErrors({
                submit: err.message || 'Failed to reset password',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-layout">
                <AuthShowcase
                    badge="Account Security"
                    title="Recover access quickly and securely"
                    description="Use password recovery to get back into your account and continue your career planning without friction."
                />

                <div className="auth-card">
                    {step === 'request' ? (
                        <>
                            <h1 className="auth-title">Forgot Password</h1>
                            <p className="auth-subtitle">
                                Enter your email to receive a password reset link
                            </p>

                            {successMessage && (
                                <div className="success-message">{successMessage}</div>
                            )}

                            {(error || errors.submit) && (
                                <div className="error-message">
                                    {error || errors.submit}
                                </div>
                            )}

                            <form onSubmit={handleRequestSubmit} className="auth-form">
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

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="auth-button"
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h1 className="auth-title">Reset Password</h1>
                            <p className="auth-subtitle">
                                Enter your new password below
                            </p>

                            {successMessage && (
                                <div className="success-message">{successMessage}</div>
                            )}

                            {(error || errors.submit) && (
                                <div className="error-message">
                                    {error || errors.submit}
                                </div>
                            )}

                            <form onSubmit={handleResetSubmit} className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="At least 6 characters"
                                        className={
                                            errors.newPassword ? 'input-error' : ''
                                        }
                                    />
                                    {errors.newPassword && (
                                        <span className="field-error">
                                            {errors.newPassword}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter your password"
                                        className={
                                            errors.confirmPassword ? 'input-error' : ''
                                        }
                                    />
                                    {errors.confirmPassword && (
                                        <span className="field-error">
                                            {errors.confirmPassword}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="auth-button"
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    )}

                    <p className="auth-footer">
                        <Link to="/login" className="auth-link">
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
