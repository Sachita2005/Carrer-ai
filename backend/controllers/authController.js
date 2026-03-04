const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailConfig = require('../config/emailConfig');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

// @desc Register user
// @route POST /api/auth/signup
exports.signup = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        // Validation
        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match',
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered. Try login instead.',
            });
        }

        // Create user
        user = await User.create({
            fullName,
            email,
            password,
        });

        // Generate token
        const token = generateToken(user._id);

        // Send verification email
        try {
            const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;
            const emailContent = `
                <h2>Welcome to Career Guidance!</h2>
                <p>Hi ${fullName},</p>
                <p>Thank you for signing up. Your account has been created successfully.</p>
                <p>You can now login with your email and password.</p>
                <p>Login URL: ${process.env.FRONTEND_URL}/login</p>
                <br/>
                <p>Best regards,<br/>Career Guidance Team</p>
            `;

            await emailConfig.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Welcome to Career Guidance System',
                html: emailContent,
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail signup if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Account created successfully! Please login.',
            token,
            user: user.toJSON(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Login user
// @route POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Check for user (need to explicitly select password field)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: user.toJSON(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Forgot password
// @route POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email',
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found with this email',
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Save reset token to database
        await ResetToken.create({
            userId: user._id,
            token: resetToken,
        });

        // Send reset email
        try {
            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
            const emailContent = `
                <h2>Password Reset Request</h2>
                <p>Hi ${user.fullName},</p>
                <p>You requested to reset your password. Click the link below to reset your password:</p>
                <p><a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a></p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <br/>
                <p>Best regards,<br/>Career Guidance Team</p>
            `;

            await emailConfig.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Password Reset Request',
                html: emailContent,
            });

            res.status(200).json({
                success: true,
                message: 'Password reset link sent to your email',
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            await ResetToken.deleteOne({ token: resetToken });
            return res.status(500).json({
                success: false,
                message: 'Failed to send reset email',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Reset password
// @route POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide token and passwords',
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match',
            });
        }

        // Find reset token
        const resetTokenDoc = await ResetToken.findOne({ token });
        if (!resetTokenDoc) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token',
            });
        }

        // Find user and update password
        const user = await User.findById(resetTokenDoc.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        user.password = newPassword;
        await user.save();

        // Delete reset token
        await ResetToken.deleteOne({ _id: resetTokenDoc._id });

        // Send confirmation email
        try {
            const emailContent = `
                <h2>Password Reset Successful</h2>
                <p>Hi ${user.fullName},</p>
                <p>Your password has been reset successfully.</p>
                <p>You can now login with your new password.</p>
                <p><a href="${process.env.FRONTEND_URL}/login" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Login Here</a></p>
                <br/>
                <p>Best regards,<br/>Career Guidance Team</p>
            `;

            await emailConfig.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: 'Password Reset Successful',
                html: emailContent,
            });
        } catch (emailError) {
            console.error('Confirmation email failed:', emailError);
        }

        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Get current user
// @route GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user: user.toJSON(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Update user profile
// @route PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, phone, bio, career_goals, skills } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Update fields
        if (fullName) user.fullName = fullName;
        if (phone) user.phone = phone;
        if (bio) user.bio = bio;
        if (career_goals) user.career_goals = career_goals;
        if (skills) user.skills = skills;
        user.updatedAt = Date.now();

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: user.toJSON(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc Change password
// @route POST /api/auth/change-password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'New passwords do not match',
            });
        }

        const user = await User.findById(req.user.id).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Verify old password
        const isPasswordMatch = await user.comparePassword(oldPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Old password is incorrect',
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
