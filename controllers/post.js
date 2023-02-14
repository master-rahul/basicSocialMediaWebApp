module.exports.create = function (request, response) {
    return response.render('home', { title: 'Create' })
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