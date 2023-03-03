const Post = require('../models/post');
module.exports.create = function (request, response) {
    Post.create({
        content: request.body.content,
        user: request.user.id
    }, function (error) {
        if (error) {
            console.log('Error Adding Contents : ',error);
            return response.redirect('back');
        }
        else {
            console.log('Success Adding Contents');
            return response.redirect('back');
        }
    });
}
module.exports.edit = function (request, response) {
    return response.render('home', { title: 'Edit' })
}
module.exports.delete = function (request, response) {
    return response.render('home', { title: 'Delete' })
}
module.exports.hide = function (request, response) {
    return response.render('home', { title: 'Hide' })
}