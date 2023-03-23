const passport = require("../config/passport_local_strategy");

module.exports.create = function (request, response) {  
    console.log('Session Creation');
    request.flash('success', 'Logged In Successfully');
    return response.redirect('/');
}
module.exports.destroy = function (request, response) {
   
    request.logout(function (error) {
        if (error) { return response.status('500').send(); }  
        else{
            request.flash('success', 'Logged Out Successfully');
            return response.redirect('/');
        }
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