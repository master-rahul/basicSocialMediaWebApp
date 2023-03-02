const passport = require("../config/passport_local_strategy");

module.exports.create = function (request, response) {
    passport.addUserData();
  
    return response.redirect('/');
}
module.exports.destroy = function (request, response) {
    request.logout(function (error) {
        if (error) { response.redirect('/'); }
        response.redirect('/');
    });

    // request.session.destroy(error, function () {
    //     if (error) {
    //         console.log('error');
    //         return response.redirect('/');
    //     } else {
    //         response.send('Session is destroyed')
    //         return response.redirect('/');
    //     }
    // }
}