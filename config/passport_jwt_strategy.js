const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // auth header has the json web token so we can extract 
    secretOrKey : 'secret', // every encryption and decryption happens from this key
};

passport.use(new JwtStrategy(options, function (jwtPayload, callback) {
    User.findById(jwtPayload._id, function (error, user) {
        if(error){
            console.log('Error in Finding User form JWT');
            return;
        }
        if(user) return callback(null, user);
        return callback(null, false);
    })
}))

module.exports = passport;