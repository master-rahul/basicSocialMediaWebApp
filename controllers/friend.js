const PendingRequest = require('../models/pendingRequests');
const Friend = require('../models/friend');
const User = require('../models/user');
module.exports.add = async function (request, response) {
    let user = await User.findById(request.query.to)
    if(user){
        await PendingRequest.create({from_user : request.user.id, to_user : request.query.to});
        //let friend = await Friend.create({ from_user: request.user.id, to_user: request.query.to });
        //user.friends.push(friend)
        //user.save();
        //user = await User.findById(request.user.id);
        //user.friends.push(friend);
        //user.save();
        return response.json(200, {messgae : "Request Successfully Completed"});
    }else{
        return response.json(500, {message : "Internal Server Error"});
    }
}

module.exports.accept = async function (request, response) {
    console.log(request.query);
    let user = await User.findById(request.user.id)
    let pendingRequests =  await PendingRequest.findById(request.query.id);
    if(pendingRequests){
        let friend = await Friend.create({from_user : pendingRequests.from_user, to_user : pendingRequests.to_user});
        user.friends.push(friend)
        user.save();
       //console.log("--------------------------------------------------------------",request.query.to);
        let user1 = await User.findById(request.query.to);
        //console.log(user1);
        user1.friends.push(friend);
        user1.save();
        await PendingRequest.findByIdAndDelete(request.query.id);
    }
    return response.json(200, {
        message: 'Request Success'
    });
}

module.exports.remove = async function (request, response) {
    return response.json(200, {
        message: 'Request Success'
    });
}