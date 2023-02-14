module.exports.create = function (request, response) {
    return response.render('home', { title: 'Create' })
}
module.exports.destroy = function (request, response) {
    return response.render('home', { title: 'Destroy' })
}