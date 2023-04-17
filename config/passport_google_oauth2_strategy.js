const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new GoogleStrategy({
        clientID: 'YOUR_CLIENT_IS',
        clientSecret: 'YOUR_CLIENT_SECRET',
        callbackURL: 'http://localhost:8000/user/auth/google/callback', 
    },
    function (accessToken, refreshToken, profile, callback) {
        module.exports.token = accessToken;
        
        console.log("Access Token :", accessToken, " :: Refresh Token : ", refreshToken);
        User.findOne({email : profile.emails[0].value}).select('-password').exec(function (error, user) {
            if(error) {
                console.log("Error in Google Strategy",error);
                return callback(null, false);
            }
            else if(user){
                // if found, set this user as request.user
                    //console.log('FOUND : ', profile);
                    return callback(null, user);   
            }else{
                // console.log('NOT FOUND : ', profile);
                // if not found, create and set it as request.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function (error, user1) {
                    if(error) {console.log("Error Creating User using Google Strategy"); return callback(null, false)}
                    return callback(null, user1);
                });
                
            }
        });
        
    }
));

module.exports = passport;

