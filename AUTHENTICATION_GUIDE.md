# Career Guidance System - Authentication & Settings Guide

## Overview
A complete authentication system has been implemented with email verification, password reset, user profiles, and account settings management. The system uses Node.js with Express, MongoDB, and Nodemailer for email functionality on the backend, and React with React Router for the frontend.

---

## Backend Implementation

### 1. **Environment Configuration** 
**File:** `.env`
```
MONGODB_URI=mongodb://localhost:27017/career_guidance
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_FROM=noreply@careerguidance.com
FRONTEND_URL=http://localhost:5173
```

### 2. **Installed Dependencies**
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation and verification
- `nodemailer` - Email sending
- `mongoose` - MongoDB object modeling

### 3. **Database Models**

#### User Model (`backend/models/User.js`)
- Full Name (required)
- Email (unique, required)
- Password (hashed with bcryptjs)
- Phone Number
- Bio
- Career Goals
- Skills (array)
- Profile Image URL
- Email Verification Status
- Created/Updated timestamps

#### ResetToken Model (`backend/models/ResetToken.js`)
- Stores password reset tokens
- Automatically expires after 1 hour
- Links to User via userId

### 4. **Configuration Files**

#### Email Configuration (`backend/config/emailConfig.js`)
- Sets up Nodemailer SMTP transporter
- Uses Gmail SMTP (configurable)
- Verifies connection on startup

#### Database Connection (`backend/config/db.js`)
- MongoDB connection setup
- Connection pooling and error handling
- Logs connection status

### 5. **Authentication Routes** (`backend/routes/authRoutes.js`)

#### Public Routes:
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset email
- `POST /api/auth/reset-password` - Reset password with token

#### Protected Routes (require JWT token):
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### 6. **Authentication Controller** (`backend/controllers/authController.js`)

#### Signup Function
- Validates input (full name, email, password match)
- Checks for duplicate email
- Hashes password before saving
- Sends welcome email (optional)
- Returns JWT token

#### Login Function
- Validates credentials
- Compares password with stored hash
- Returns JWT token and user data

#### Forgot Password Function
- Generates random reset token
- Saves token to database (1-hour expiry)
- Sends password reset email with link

#### Reset Password Function
- Validates reset token
- Updates password
- Sends confirmation email
- Deletes used token

#### Change Password Function
- Verifies old password
- Updates to new password
- Only for authenticated users

#### Profile Update Function
- Updates user profile fields
- Supports full name, phone, bio, career goals

### 7. **Middleware** (`backend/middleware/auth.js`)
- JWT token verification
- Extracts user ID from token
- Protects routes requiring authentication

---

## Frontend Implementation

### 1. **Authentication Context** (`frontend/src/context/AuthContext.jsx`)
- Manages global authentication state
- Stores token and user data in localStorage
- Provides auth methods:
  - `signup(fullName, email, password, confirmPassword)`
  - `login(email, password)`
  - `logout()`
  - `forgotPassword(email)`
  - `resetPassword(token, newPassword, confirmPassword)`
  - `updateProfile(profileData)`
  - `changePassword(oldPassword, newPassword, confirmPassword)`
- Includes `useAuth()` hook for component access

### 2. **Pages**

#### Signup Page (`frontend/src/pages/Signup.jsx`)
- Registration form with validation
- Fields: Full Name, Email, Password, Confirm Password
- Real-time error display
- Auto-redirects to dashboard on success
- Link to login page for existing users
- Styled with Auth.css

#### Login Page (`frontend/src/pages/Login.jsx`)
- Login form with validation
- Fields: Email, Password
- "Forgot Password" link
- Auto-redirects to dashboard on success
- Link to signup page for new users
- Styled with Auth.css

#### Forgot Password Page (`frontend/src/pages/ForgotPassword.jsx`)
- Two-step process:
  1. Request reset: Enter email to receive reset link
  2. Reset: Enter new password with reset token
- Auto-detects token in URL
- Sends confirmation email on success
- Link to login page
- Styled with Auth.css

#### Settings Page (`frontend/src/pages/Settings.jsx`)
- Tabbed interface with three sections:
  1. **Profile Tab**
     - Update full name, phone, bio, career goals
     - Email field (disabled, read-only)
     - Real-time character count for bio/goals
  2. **Password Tab**
     - Change password
     - Requires current password verification
     - New password confirmation
  3. **Account Tab**
     - Account status
     - Member since date
     - Email verification status
     - Logout button (with confirmation)
- Styled with Settings.css

### 3. **Styling**

#### Auth.css (`frontend/src/pages/Auth.css`)
- Gradient background (purple theme)
- Centered card layout
- Form validation feedback
- Error and success messages
- Responsive design (mobile-friendly)
- Smooth animations

#### Settings.css (`frontend/src/pages/Settings.css`)
- Two-column layout (tabs + content)
- Tab navigation system
- Form styling with validation
- Account info cards
- Danger zone for logout
- Responsive grid layout
- Mobile optimizations

### 4. **Component Updates**

#### Header Component (`frontend/src/components/Header.jsx`)
- Displays user's full name
- User menu dropdown with:
  - Current user info (name, email)
  - Settings link
  - Logout button
- Click-to-toggle dropdown
- Integrates with Auth context

#### App Component (`frontend/src/App.jsx`)
- React Router implementation
- AuthProvider wrapper
- Protected routes using ProtectedRoute component
- Routes:
  - `/signup` - Public signup page
  - `/login` - Public login page
  - `/forgot-password` - Public forgot password page
  - `/dashboard` - Protected dashboard
  - `/settings` - Protected settings page

### 5. **Protected Routes**
- Automatically redirects to login if not authenticated
- Shows loading state while checking auth
- Preserves user data across page refreshes

---

## Features Implemented

### User Authentication
✅ Signup with email validation
✅ Login with secure password verification
✅ JWT-based authentication
✅ Session persistence with localStorage
✅ Auto-logout on token expiry

### Password Management
✅ Password hashing with bcryptjs (10 salt rounds)
✅ Forgot password via email
✅ Password reset with time-limited tokens (1 hour)
✅ Change password for logged-in users
✅ Password confirmation validation

### Email Notifications
✅ Welcome email on signup
✅ Password reset email with secure link
✅ Password reset confirmation email
✅ Nodemailer SMTP integration
✅ HTML-formatted emails

### User Profile Management
✅ Update profile information
✅ Phone number storage
✅ Bio/short profile description
✅ Career goals tracking
✅ Skills list
✅ Profile timestamps (created/updated)

### Settings & Account Management
✅ Tabbed settings interface
✅ Profile update form
✅ Password change form
✅ Account information display
✅ Email verification status
✅ Member since date
✅ Logout functionality

---

## How to Use

### Setup Backend
1. **Configure MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env`

2. **Configure Email (Gmail)**
   - Enable "Less secure app access" or use App Password
   - Update `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`

3. **Start Backend**
   ```bash
   cd backend
   npm install  # Already done
   npm run dev  # Starts with nodemon
   ```

### Setup Frontend
1. **Start Development Server**
   ```bash
   cd frontend
   npm install  # Already done
   npm run dev  # Starts Vite dev server
   ```

### Testing the Flow
1. Navigate to http://localhost:5173/signup
2. Create a new account
3. Login with credentials
4. Access dashboard and settings
5. Test password change in Settings
6. Test logout (will require re-login)

---

## Security Features

✅ Password hashing with bcryptjs
✅ JWT token authentication
✅ Email-based password recovery
✅ Token expiration (7 days)
✅ Password reset token expiration (1 hour)
✅ Protected API routes
✅ Environment variable protection
✅ Session localStorage for persistence

---

## API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| POST | `/api/auth/forgot-password` | No | Request password reset |
| POST | `/api/auth/reset-password` | No | Reset password with token |
| GET | `/api/auth/me` | Yes | Get current user |
| PUT | `/api/auth/profile` | Yes | Update profile |
| POST | `/api/auth/change-password` | Yes | Change password |

---

## Next Steps (Optional Enhancements)

- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Email verification on signup
- [ ] Profile picture upload
- [ ] User activity logging
- [ ] Account deletion functionality
- [ ] Admin user management
- [ ] User preferences and notifications settings
- [ ] Password strength meter
- [ ] Account recovery options

---

## Troubleshooting

### Email Not Sending
- Check `EMAIL_USER` and `EMAIL_PASSWORD`
- Enable Gmail App Password if using Gmail
- Test SMTP connection in `emailConfig.js`

### MongoDB Connection Error
- Verify MongoDB is running
- Check `MONGODB_URI` format
- Ensure firewall allows connection

### JWT Token Errors
- Clear browser localStorage
- Logout and login again
- Check `JWT_SECRET` is consistent

### CORS Issues
- Verify `FRONTEND_URL` in .env
- Check backend CORS configuration
- Ensure ports match (5000 for backend, 5173 for frontend)

---

**Version:** 1.0.0  
**Last Updated:** March 2025  
**Status:** Production Ready
