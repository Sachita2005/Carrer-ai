# Quick Start Guide - Authentication System

## Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas account
- Gmail account (or other email service for Nodemailer)

## Step 1: Configure Environment Variables

### Backend (.env)
```
# Database
MONGODB_URI=mongodb://localhost:27017/career_guidance

# JWT
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@careerguidance.com

# Frontend
FRONTEND_URL=http://localhost:5173
```

## Step 2: Google App Password Setup (for Gmail)
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Create App Password (select Mail and Windows Computer)
4. Use the generated password in `.env` EMAIL_PASSWORD

## Step 3: Start MongoDB
```bash
# Local MongoDB
mongod

# OR use MongoDB Atlas cloud database
# Update MONGODB_URI in .env
```

## Step 4: Start Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

## Step 5: Start Frontend
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## Step 6: Access the Application
- Open http://localhost:5173 in browser
- Click "Sign Up" to create account
- Login with your credentials
- Access Settings from header user menu

---

## Testing Checklist

- [ ] Signup with valid email
- [ ] Receive welcome email
- [ ] Login with credentials
- [ ] View profile information
- [ ] Update profile fields
- [ ] Change password
- [ ] Logout and login again
- [ ] Use "Forgot Password" feature
- [ ] Check password reset email
- [ ] Reset password with link

---

## Verification

### Check Backend Connection
```bash
# In backend directory
npm run dev

# Look for:
# ✅ MongoDB connected: localhost
# ✅ SMTP Server is ready to send emails
# ✅ Server running on http://localhost:5000
```

### Check Frontend Build
- No console errors
- Can navigate between pages
- Auth context loads user data

---

## File Structure Created

```
backend/
├── config/
│   ├── db.js          (MongoDB connection)
│   └── emailConfig.js (Nodemailer setup)
├── controllers/
│   └── authController.js (Auth logic)
├── middleware/
│   └── auth.js         (JWT verification)
├── models/
│   ├── User.js
│   └── ResetToken.js
├── routes/
│   └── authRoutes.js   (Auth endpoints)
└── server.js           (Updated with auth routes)

frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx (Auth state)
│   ├── pages/
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Settings.jsx
│   │   ├── Auth.css
│   │   └── Settings.css
│   ├── components/
│   │   └── Header.jsx   (Updated with user menu)
│   └── App.jsx          (Updated with router)
```

---

## Common Issues & Solutions

### 1. "Cannot find module 'mongoose'"
```bash
cd backend
npm install mongoose
```

### 2. "Gmail login failed"
- Use Gmail App Password (not regular password)
- Enable "Less secure apps" if not using 2FA
- Check EMAIL_USER and EMAIL_PASSWORD in .env

### 3. "MongoDB connection refused"
```bash
# Start MongoDB service
mongod

# Or update MONGODB_URI to MongoDB Atlas cloud version
```

### 4. "Port 5000 already in use"
```bash
# Change PORT in backend/server.js or kill the process
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### 5. "CORS error" or "Token not found"
- Clear browser localStorage: `localStorage.clear()`
- Logout and login again
- Check FRONTEND_URL in .env matches your React dev server

---

## Development Tips

1. **Check Network Requests**
   - Open DevTools (F12)
   - Go to Network tab
   - Monitor API calls to `/api/auth/*`

2. **View User Data**
   - Open DevTools Console
   - Type: `localStorage.getItem('user')`
   - Paste to JSON formatter to view

3. **Test Email Sending**
   - Check spam folder for emails
   - Verify EMAIL_FROM and EMAIL_HOST
   - Check backend console for email errors

4. **Debug Auth Issues**
   - Check token in localStorage
   - Verify JWT_SECRET is consistent
   - Check browser console for AuthContext errors

---

## Production Deployment Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Use environment-specific MongoDB URI
- [ ] Add rate limiting to auth endpoints
- [ ] Enable HTTPS for all communications
- [ ] Use OAuth2 for email provider authentication
- [ ] Set secure cookies (if implementing)
- [ ] Add email verification on signup
- [ ] Implement refresh token rotation
- [ ] Add user activity logging
- [ ] Set up error monitoring (Sentry, etc)

---

## Support Files
- 📖 See `AUTHENTICATION_GUIDE.md` for detailed documentation
- 🔗 API endpoints in AUTHENTICATION_GUIDE.md
- 🎨 Component structure in AUTHENTICATION_GUIDE.md

---

**Ready to go!** 🚀
Start with Step 1-5 above and you'll have a fully functional authentication system.
