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
    Comment.create({
      content : request.body.content,
      user : request.body.userId,
      post : request.body.postId  
    }, function (error, comment) {
        if(error){
            console.log('Error in Adding Comment');
            return response.redirect('back');
        }
        else {
            // const filter = { id : 'Jean-Luc Picard' };
            // const update = { age: 59 };

            // // `doc` is the document _before_ `update` was applied
            // let doc = await Character.findOneAndUpdate(filter, update);
            Post.updateOne({_id : request.body.postId},{ $push: { comments : comment._id } },function (error, data) {
                if(error) {
                    console.log('Error Pushing comment data in postSchema');
                    return response.redirect('back');
                }else{
                    console.log('Success in Pushing comment data in postSchema');
                    console.log(data);
                    return response.redirect('back');
                }
            });
            // console.log('Success In Adding Comment');
            // return response.redirect('back');
        }
    })
}
module.exports.edit = function (request, response) {
    return response.render('home', { title: 'Edit' })
}
module.exports.delete = function (request, response) {
    return response.render('home', { title: 'Delete' })
}
module.exports.hide = function (request, response) {
    return response.render('home', { title: 'Hide' })
}
