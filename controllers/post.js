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
        let posts = await Post.create({ content : request.body.content, user : request.user.id});
        if(request.xhr){
            return response.status(200).json({
                data : {
                    posts :posts
                }, 
                message : "Post Created!"
            });
        }
        request.flash('success', 'Post Published Successfully');
        return response.redirect('back');
    } catch(error){
        request.flash('error', 'Error Publishing Post');
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
            await Comment.deleteMany({ post: request.params.id });
            request.flash('success', 'Post Deleted Successfully');
            if(request.xhr){
                return response.status(200).json({
                    data : {
                        posts_id : request.params.id
                    },
                    message: "Post Deleted"
                });
            }
            return response.redirect('back');
        }
        request.flash('error', 'Post Deletion not Successful');
        return response.redirect('back');
    } catch(error){
        request.flash('error', 'Post Deletion not Successful');
        return response.status(500).send();
    }
}