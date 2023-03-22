const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.create = async function (request, response) {
    try{
        let user = await User.findOne({ email: request.body.email });
        if (!user || user.password != request.body.password) {
            return response.json(422, {
                message: "Invalid Username/Password"
            });
        }
        return response.json(200, {
            message : "Signed In Successfully : here is your token, please keep it safe!",
            data :{
                token : jwt.sign(user.toJSON(), 'secret', {expiresIn : '100000'})  // using the jwt library
            }
        });
        
    }catch{
        return response.json(500, {
            message : "Internal Sever Error"
        });
    }

}
module.exports.destroy = function (request, response) {

    request.logout(function (error) {
        if (error) { return response.status('500').send(); }
        else {
            request.flash('success', 'Logged Out Successfully');
            return response.redirect('/');
        }
    });
}