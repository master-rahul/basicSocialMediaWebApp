const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email', // needs to match with field having property unique in UserSchema.
},
    function (email, password, done) {
        // find the user and estaablish the identity
        User.findOne({ email: email }, function (error, user) {
            if (error) {
                console.log('Error finding the user');
                return done(error);
            }
            else if (!user || user.password != password) {
                console.log('Invalid username password');
                return done(null, false);
            } else {
                console.log('User authenticated');
                return done(null, user);
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('de-serialize')
    User.findById(id, function (error, user) {
        if (error) return done(error);
        else return done(null, user);
    });
});


passport.checkAuthentication = function (request, response, next) {
    if(request.isAuthenticated()) return next();
    return response.redirect('/user/signIn');   
}

passport.setAuthenticated = function (request, response, next) {
    if(request.isAuthenticated()) response.locals = request.user;
    return next();
}

passport.redirectAuthenticated = function(request, response, next){
    if(request.isAuthenticated()) return response.redirect('/profile');
    return next();
}

module.exports = passport;