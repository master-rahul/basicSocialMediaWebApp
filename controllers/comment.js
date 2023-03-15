const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function (request, response) {

    // SECOND_BEST WAY

    // Post.findById(request.body.postId, function (error, post) {
    //     if (error) return response.redirect('back');
    //     else if (post) {
    //         Comment.create({
    //             content: request.body.content,
    //             user: request.user.id,
    //             post: request.body.postId
    //         }, function (error, comment) {
    //             if (error) {
    //                 console.log('Error in Adding Comment');
    //                 return response.redirect('back');
    //             }
    //             else {
    //                 // Post.updateOne({ _id: request.body.postId }, { $push: { comments: comment._id } }, function (error, data) {
    //                 //     if (error) {
    //                 //         console.log('Error Pushing comment data in postSchema');
    //                 //         return response.redirect('back');
    //                 //     } else {
    //                 //         console.log('Success in Pushing comment data in postSchema');
    //                 //         console.log(data);
    //                 //         return response.redirect('back');
    //                 //     }
    //                 // });
    //                 post.comments.push(comment);   // updating the post document
    //                 post.save();                    // saves the changes in database. saves tells database it is final data else the data is present in memory only.
    //                 return response.redirect('back');
    //             }
    //         });
    //     }
    //     else {
    //         console.log('Post Id Not Found');
    //         return response.redirect('back');
    //     }
    // });

    // BEST_WAY
    try{
        let post = await Post.findById(request.body.postId);
        if (post) {
            let create = await Comment.create({ content: request.body.content, user: request.user.id, post: request.body.postId });
            post.comments.push(create);
            post.save();
            request.flash('success', 'Comment Published Successfully');
            return response.redirect('back');
        }else{
            request.flash('error', 'Error Publishing Comment');
            return response.redirect('back');
        }
    } catch(error){
        request.flash('error', 'Comment Publishing Post');
        return response.status('500').send();
    }

}

module.exports.delete = async function (request, response) {

    //SECOND_BEST WAY
    // Comment.findById(request.params.id, function (error, comment) {
    //     if(error) return response.redirect('back');
    //     else{
    //         var postId = comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId,{$pull : {comments : request.params.id}}, function (error, id) {
    //             if(error) return response.redirect('back');
    //             else return response.redirect('back');
    //         });
    //     }
    // });

    //BEST WAY
    try{
        let del = await Comment.findById(request.params.id);
        var postId = del.post;
        del.remove();
        await Post.findByIdAndUpdate(postId, { $pull: { comments: request.params.id } });
        request.flash('success', 'Success Deleting Comment');
        return response.redirect('back');
    } catch(error){
        request.flash('error', 'Error Deleting Comment');
        return response.status('500').send();
    }
}