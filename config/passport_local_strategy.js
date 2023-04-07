const cookieParser = require('cookie-parser')       // Fetch cookie-parser modules  .
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const MongoStore = require('connect-mongo');        // Fetch connect-mongo modules.
const cookie = require('cookie');

passport.use(new LocalStrategy({
        usernameField: 'email', // needs to match with field having property unique in UserSchema.
        passReqToCallback : true // allows us to set the first arguments as request
    },
    function (request, email, password, done) {
        // find the user and estaablish the identity
        User.findOne({ email: email }, function (error, user) {
            if (error) {
                request.flash('error', 'User not found');
                return done(error);
            }
            else if (!user || user.password != password) {
                request.flash('error', 'Error Username/Password');
                return done(null, false);
            } else {
                console.log('User authenticated');
                return done(null, user);
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    //console.log('serialize');
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    //console.log('de-serialize')
    User.findById(id).select('-password').exec(function (error, user) {
        if (error) return done(error);
        else {
            //var user = { name: userData.name, id: id, email : userData.email};
            return done(null, user);
        }
    })
});

passport.checkAuthentication = function (request, response, next) {
    if(request.isAuthenticated()) return next();
    return response.redirect('/user/signIn');   
}

passport.setAuthenticated = function (request, response, next) {
    if(request.isAuthenticated()) {
        response.locals.name = request.user.name;
        response.locals.userId = request.user.id;
    }
    return next();
}

passport.redirectAuthenticated = function(request, response, next){
    if(request.isAuthenticated()) return response.redirect('/profile');
    return next();
}

passport.decodeCookie = function(request, response, next){
    //console.log(request.cookies.sample);
    if(!request.cookies.sample) return next();
    const sidParsed = cookieParser.signedCookie(request.cookies.sample, 'hello');
    console.log(sidParsed);
    cookieValue = sidParsed;
    console.log(request.cookies);
    if (request.isAuthenticated()){
        response.locals = request.user;
        console.log(request.user);
        request.cookieValue = sidParsed;
    } 
    return next();
}
passport.addValue = function(request, response, next) {
    request.cookieValue = cookieValue;
    return next();
}

module.exports = passport;