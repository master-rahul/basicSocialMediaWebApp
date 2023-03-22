const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.posts = async function (request, response) {
    let excludeField = {password : false};
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate({
        path : 'user',
        select : '-password'
    })
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    });
    return response.json(200,{
        message : "List of Post in V1",
        posts : posts
    })
}

module.exports.delete = async function (request, response) {
    try {
        let post = await Post.findById(request.params.id);
        post.remove();
        await Comment.deleteMany({ post: request.params.id });
        return response.json(200, {
            message : "Posts and associated comments deleted successfully"
        });          
    } catch (error) {
        return response.json(500,{
            message : "Internal Server Error"
        });
    }
}