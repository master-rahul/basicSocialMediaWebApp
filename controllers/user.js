module.exports.signIn = function (request, response) {
    return response.render('signIn', { title: 'Sign In' })
}
module.exports.signUp = function (request, response) {
    return response.render('signUp', { title: 'Sign Up' })
}
module.exports.add = function (request, response) {
    return response.render('home', { title: 'Added' })
}
module.exports.remove = function (request, response) {
    return response.render('home', { title : 'Remove' })
}