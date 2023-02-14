module.exports.create = function (request, response) {
    return response.redirect('/profile')
}
module.exports.destroy = function (request, response) {
    request.logout(function (error) {
        if (error) { response.redirect('/'); }
        response.redirect('/');
    });
}