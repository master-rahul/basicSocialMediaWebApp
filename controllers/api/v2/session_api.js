const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment')

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
                token : jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn : '100000'})  // using the jwt library
            }
        });
        
    }catch{
        return response.json(500, {
            message : "Internal Sever Error"
        });
    }

}
module.exports.destroy = function (request, response) {
    return response.json(200, {
        message : 'The token is now not valid'
    })
}