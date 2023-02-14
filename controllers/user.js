const db = require('../config/mongoose');
const userSchema = require('../models/user');

module.exports.signIn = function (request, response) {
    return response.render('signIn', { title: 'Sign In' })
}
module.exports.signUp = function (request, response) {
    return response.render('signUp', { title: 'Sign Up' })
}
module.exports.add = function (request, response) {
    if (request.body.password != request.body.confirm_password) return response.redirect('back');
    userSchema.findOne({ email: request.email }, function (error, user) {
        if (error) return response.redirect('back');
        else if (!user) {
            userSchema.create({
                name: request.body.name,
                email: request.body.email,
                password: request.body.password
            },  function (error) {
                    if (error) return response.redirect('back');
                    else return response.redirect('/user/signIn');
            });
        } else return response.redirect('back');
    });
}
module.exports.remove = function (request, response) {
    return response.render('home', { title : 'Remove' })
}