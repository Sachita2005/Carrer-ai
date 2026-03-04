const nodemailer = require('nodemailer');
require('dotenv').config();

const emailConfig = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Verify connection configuration
emailConfig.verify((error, success) => {
    if (error) {
        console.error('❌ Email configuration error:', error);
    } else {
        console.log('✅ SMTP Server is ready to send emails');
    }
});

module.exports = emailConfig;
