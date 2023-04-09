const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (request, response) {
    console.log(request.query);
    try {
        let likeable;
        let deleted = false; // returns this variable to xhr request and we can increment the count of likes depending on this variables value
        if (request.query.type == 'Post') likeable = await Post.findById(request.query.id).populate('likes');
        else likeable = await Comment.findById(request.query.id).populate('likes');
        console.log(request.user.id);
         // check if a like already exits
        let existingLike = await Like.findOne({
            likeable : request.query.id,
            onModel : request.query.type,
            user : request.user.id
        });
        if(existingLike) {
            // deleting the like
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            // add the like
            let newLike = await Like.create({
                user : request.user.id,
                likeable : request.query.id,
                onModel : request.query.type
            });
            // pushing the like into the array of likes in post or comment type.
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return response.json(200,{
            message : 'Request Successfull',
            data : {
                deleted : deleted,
                likes : likeable.likes.length
            }
        });
    } catch (error) {
        console.log(error)
        return response.json(500, {
            message : 'Internal Server Error'
        });  
    }
    
}