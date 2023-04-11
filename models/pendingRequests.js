const mongoose = require('mongoose');
const pendingRequestSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamp: true });

const PendingRequest = mongoose.model('PendingRequest', pendingRequestSchema);
module.exports = PendingRequest;