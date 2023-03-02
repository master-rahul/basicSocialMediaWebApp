const cookieParser = require('cookie-parser')       // Fetch cookie-parser modules  .
//const db = require('../config/mongoose');
//const userSchema = require('../models/sessions');

module.exports.home = function(request, response) {
    // if (request.cookies.sample) {
    //     const sidParsed = cookieParser.signedCookie(request.cookies.sample, 'hello');
    //     if (request.isAuthenticated()) {
    //         response.userName = request.user;
    //         sessions.findOne({ _id: sidParsed }, function (error, user) {
    //             if (error) console.log('Error Finding ID');
    //             else{
    //                 response.userName = user.name;
    //             } 
    //         });
    //     }
    // }
    return response.render('home', {title : 'Home'});
}