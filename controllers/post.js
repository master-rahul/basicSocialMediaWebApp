const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function (request, response) {
    Post.create({
        content: request.body.content,
        user: request.user.id
    }, function (error) {
        if (error) {
            console.log('Error Adding Contents : ',error);
            return response.redirect('back');
        }
        else {
            console.log('Success Adding Contents');
            return response.redirect('back');
        }
    });
}
module.exports.comment = function (request, response) {
    Post.findById(request.body.postId, function (error, post) {
        if(error) return response.redirect('back');
        else if(post){
            Comment.create({
                content: request.body.content,
                user: request.user.id,
                post: request.body.postId
            }, function (error, comment) {
                if (error) {
                    console.log('Error in Adding Comment');
                    return response.redirect('back');
                }
                else {
                    // Post.updateOne({ _id: request.body.postId }, { $push: { comments: comment._id } }, function (error, data) {
                    //     if (error) {
                    //         console.log('Error Pushing comment data in postSchema');
                    //         return response.redirect('back');
                    //     } else {
                    //         console.log('Success in Pushing comment data in postSchema');
                    //         console.log(data);
                    //         return response.redirect('back');
                    //     }
                    // });
                    post.comments.push(comment);   // updating the post document
                    post.save();                    // saves the changes in database. saves tells database it is final data else the data is present in memory only.
                    return response.redirect('back');
                }
            });
        }
        else{
            console.log('Post Id Not Found');
            return response.redirect('back');
        } 
    });
}

module.exports.viewComments = function (request, response) {
   
}