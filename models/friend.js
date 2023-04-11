const mongoose = require('mongoose');
const friendSchema = new mongoose.Schema({
    from_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    to_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    }
}, { timestamp : true });

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;