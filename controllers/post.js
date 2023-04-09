const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const { posts } = require('./api/v1/posts_api');
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
                    post : posts,
                    name : request.user.name
                }, 
                message : "Post Created!"
            }).send();
        }else{
            request.flash('success', 'Post Published Successfully');
            return response.redirect('back');
        }
    } catch(error){
        request.flash('error', 'Error Publishing Post');
       return response.status(500).send();
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
            // delete all the likes for the post 
            await Like.deleteMany({ likeable: request.params.id, onModel : 'Post' });
            // delete all the likes for the comments of the same
            await Like.deleteMany({ likeable : post.comments });
            
            //await Like.deleteMany({ likeable: post, onModel: 'Post' });
            //await Like.deleteMany({ _id: { $in: post.comments } });

            post.remove();
            await Comment.deleteMany({ post: request.params.id });
           
            console.log(request.params.id);
            if(request.xhr){
                console.log('Deleting');
                return response.status(200).json({
                    data : {
                        posts_id : request.params.id
                    },
                    message: "Post Deleted"
                }).send();
            }else{
                request.flash('success', 'Post Deleted Successfully');
                return response.redirect('back');
            }
        }
        request.flash('error', 'Post Deletion not Successful');
        return response.redirect('back');
    } catch(error){
        //console.log(error);
        request.flash('error', 'Post Deletion not Successful');
        return response.status(500).send();
    }
}

module.exports.like = function (request, response) {
    if (request.user.id == request.body.userId) {
        if (request.xhr) {
            Post.findById(request.body.postId, function (error, post) {
                if (error) {
                    console.log('Error in Finding Post', error)
                    response.status(500).send();
                } else if (post && post.id == request.body.postId) {
                    console.log('Success in Finding Post');
                    return response.status(200).send();
                } else {
                    console.log('Error in Finding Post');
                    request.flash('error', 'Not able to Like the Post');
                    return response.status(500).send();
                }
            })
        } else {
            request.flash('success', 'Post Deleted Successfully');
            return response.redirect('back');
        }
        

    }
    //return response.redirect('back');
}

module.exports.unlike = function (request, response) {
    console.log(request.user.id);
    return response.redirect('back');
}