const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/user/avatar');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar : {
        type : String
    }
}, { timestamps: true });       // Adds two fields 'createdAt' and 'updatedAt'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname , '..', AVATAR_PATH ));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + uniqueSuffix)
    }
});



// static functions for access from controllers

userSchema.statics.uploadedAvatar = multer({
    storage: storage, limits: { fileSize: 4 * 1024 * 1024 }, fileFilter : (request, file, callback) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') return callback(null, true);
        else{
            request.flash('error', 'File type is not valid for profile picture');
            return callback(null, false);    
        } 
    } 
}).single('avatar');

userSchema.statics.avatarPath = AVATAR_PATH;

const User = new mongoose.model('User', userSchema);

module.exports = User;