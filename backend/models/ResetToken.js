const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // Token expires after 1 hour
    },
});

module.exports = mongoose.model('ResetToken', resetTokenSchema);
