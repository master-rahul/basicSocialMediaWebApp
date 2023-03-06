const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function (request, response) {
    // Post.create({
    //     content: request.body.content,
    //     user: request.user.id
    // }, function (error) {
    //     if (error) {
    //         console.log('Error Adding Contents : ',error);
    //         return response.redirect('back');
    //     }
    //     else {
    //         console.log('Success Adding Contents');
    //         return response.redirect('back');
    //     }
    // });
    try{
        let create = await Post.create({ content : request.body.content, user : request.user.id});
        return response.redirect('back');
    } catch(error){
       return response.status('500').send();
    }
}


module.exports.delete = async function (request, response) {
    // Post.findById(request.params.id, function(error, post){
    //     // .id means converting the object id to string
    //     if(post && post.user == request.user.id){
    //         post.remove();
    //         Comment.deleteMany({post : request.params.id}, function (error) {
    //             return response.redirect('back');
    //         });
    //     }else return response.redirect('back');
    // });

    try{
        let post = await Post.findById(request.params.id);
        if (post && post.user == request.user.id) {
            post.remove();
            let comment = await Comment.deleteMany({ post: request.params.id });
        }
        return response.redirect('back');
    } catch(error){
        return response.status(500).send();
    }
}