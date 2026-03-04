import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
    const { user, logout, updateProfile, changePassword, error } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [profileErrors, setProfileErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});

    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
        career_goals: user?.career_goals || '',
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (profileErrors[name]) {
            setProfileErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (passwordErrors[name]) {
            setPasswordErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateProfileForm = () => {
        const newErrors = {};

        if (!profileData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (profileData.fullName.trim().length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters';
        }

        return newErrors;
    };

    const validatePasswordForm = () => {
        const newErrors = {};

        if (!passwordData.oldPassword) {
            newErrors.oldPassword = 'Current password is required';
        }

        if (!passwordData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (passwordData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (!passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const newErrors = validateProfileForm();
        if (Object.keys(newErrors).length > 0) {
            setProfileErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setSuccessMessage('');
            await updateProfile(profileData);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setProfileErrors({
                submit: err.message || 'Failed to update profile',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const newErrors = validatePasswordForm();
        if (Object.keys(newErrors).length > 0) {
            setPasswordErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setSuccessMessage('');
            await changePassword(
                passwordData.oldPassword,
                passwordData.newPassword,
                passwordData.confirmPassword
            );
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setSuccessMessage('Password changed successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setPasswordErrors({
                submit: err.message || 'Failed to change password',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/login');
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account and preferences</p>
            </div>

            <div className="settings-content">
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
                        onClick={() => setActiveTab('password')}
                    >
                        Password
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        Account
                    </button>
                </div>

                <div className="settings-panel">
                    {successMessage && (
                        <div className="success-message">{successMessage}</div>
                    )}

                    {(error || profileErrors.submit || passwordErrors.submit) && (
                        <div className="error-message">
                            {error ||
                                profileErrors.submit ||
                                passwordErrors.submit}
                        </div>
                    )}

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="tab-content">
                            <h2>Profile Information</h2>
                            <form onSubmit={handleUpdateProfile}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="disabled-input"
                                        />
                                        <small>Email cannot be changed</small>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={profileData.fullName}
                                            onChange={handleProfileChange}
                                            className={
                                                profileErrors.fullName
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />
                                        {profileErrors.fullName && (
                                            <span className="field-error">
                                                {profileErrors.fullName}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleProfileChange}
                                            placeholder="+1 (123) 456-7890"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bio">Bio</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleProfileChange}
                                        placeholder="Tell us about yourself"
                                        rows="4"
                                    />
                                    <small>
                                        {profileData.bio.length}/500 characters
                                    </small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="career_goals">
                                        Career Goals
                                    </label>
                                    <textarea
                                        id="career_goals"
                                        name="career_goals"
                                        value={profileData.career_goals}
                                        onChange={handleProfileChange}
                                        placeholder="What are your career aspirations?"
                                        rows="4"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="submit-btn"
                                >
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Password Tab */}
                    {activeTab === 'password' && (
                        <div className="tab-content">
                            <h2>Change Password</h2>
                            <form onSubmit={handleChangePassword}>
                                <div className="form-group">
                                    <label htmlFor="oldPassword">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={passwordData.oldPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter your current password"
                                        className={
                                            passwordErrors.oldPassword
                                                ? 'input-error'
                                                : ''
                                        }
                                    />
                                    {passwordErrors.oldPassword && (
                                        <span className="field-error">
                                            {passwordErrors.oldPassword}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="At least 6 characters"
                                        className={
                                            passwordErrors.newPassword
                                                ? 'input-error'
                                                : ''
                                        }
                                    />
                                    {passwordErrors.newPassword && (
                                        <span className="field-error">
                                            {passwordErrors.newPassword}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Re-enter your new password"
                                        className={
                                            passwordErrors.confirmPassword
                                                ? 'input-error'
                                                : ''
                                        }
                                    />
                                    {passwordErrors.confirmPassword && (
                                        <span className="field-error">
                                            {passwordErrors.confirmPassword}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="submit-btn"
                                >
                                    {loading ? 'Changing...' : 'Change Password'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Account Tab */}
                    {activeTab === 'account' && (
                        <div className="tab-content">
                            <h2>Account Settings</h2>

                            <div className="account-info">
                                <div className="info-item">
                                    <h3>Account Status</h3>
                                    <p className="status-active">Active</p>
                                </div>

                                <div className="info-item">
                                    <h3>Member Since</h3>
                                    <p>
                                        {new Date(
                                            user?.createdAt
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <div className="info-item">
                                    <h3>Email Verified</h3>
                                    <p
                                        className={
                                            user?.isEmailVerified
                                                ? 'status-active'
                                                : 'status-inactive'
                                        }
                                    >
                                        {user?.isEmailVerified
                                            ? 'Yes'
                                            : 'No'}
                                    </p>
                                </div>
                            </div>

                            <div className="danger-zone">
                                <h3>Danger Zone</h3>
                                <button
                                    onClick={handleLogout}
                                    className="logout-btn"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
