module.exports.profile = function (request, response) {
    return response.render('profile', {title: 'Profile page' });
}