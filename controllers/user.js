const db = require('../config/mongoose');
const User = require('../models/user');

module.exports.signIn = function (request, response) {
    return response.render('signIn', { title: 'Sign In' })
}
module.exports.signUp = function (request, response) {
    return response.render('signUp', { title: 'Sign Up' })
}
module.exports.add = function (request, response) {
    if (request.body.password != request.body.confirm_password) return response.redirect('back');
    User.findOne({ email: request.email }, function (error, user) {
        if (error) return response.redirect('back');
        else if (!user) {
            User.create({
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
module.exports.update = function (request, response) {
    if(request.user.id == request.params.id){
        User.findByIdAndUpdate(request.params.id, {name : request.body.name, email : request.body.email}, function (error, user) {
            if(error) return response.redirect('back');
            else return response.redirect('back');
        });
    } else return response.status(401).send('Unauthorized');
}

module.exports.profile = function (request, response) {
    var id = request.params.id;
    if(id == null) id = request.user.id;
    User.findById(id, function (error, user) {
        if(error) return response.redirect('back');
        else return response.render('profile', {title : 'Profile', profileData: user});
    });
  
}