const cookieParser = require('cookie-parser');       // Fetch cookie-parser modules  .
const { findById } = require('../models/post');
//const db = require('../config/mongoose');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home =  async function(request, response) {

    // DECODING COOKIES
    // if (request.cookies.sample) {
    //     const sidParsed = cookieParser.signedCookie(request.cookies.sample, 'hello');
    //     if (request.isAuthenticated()) {
    //         response.userName = request.user;
    //         sessions.findOne({ _id: sidParsed }, function (error, user) {
    //             if (error) console.log('Error Finding ID');
    //             else{
    //                 response.userName = user.name;
    //             }
    //         });
    //     }
    // }

   //
    // Post.find(async function (error, data) {
    //     if (error) return response.redirect('back');
    //     else{
    //         var names = [];
    //         var values = [];
    //         for(var i = 0; i < data.length; i++){
    //             values.push(data[i].content);
    //             try {
    //                 const importantData = await User.findById(data[i].user)
    //                 names.push(importantData.name);
    //             } catch (exception) {
    //                 console.log(exception);
    //             }
    //         }
    //         return response.render('home', { title: 'Home',  name : names, content : values });
    //     }
    // });

    // Populating a refrence field of PostSchema with all Data from the reference Field document.

    // Post.find({}).populate('user').exec(function(error, posts){
    //     if(error) return response.redirect('back');
    //     else return response.render('home',{title : 'Home', posts : posts});
    // });


    // SECOND-BEST WAY FOR QUERIES

    // Post.find({}).populate('user').populate(
    //     {
    //         path :'comments',
    //         populate:{
    //             path: 'user'
    //         }
    //     }).exec(function (error, posts) {
    //         if (error) return response.redirect('back');
    //         else{
    //             User.find({}, function (error, user) {
    //                 if(error) return response.redirect('back');
    //                 else return response.render('home', {title : 'Home', posts : posts, allUsers : user})
    //             });
    //         }
    //     });


    // BEST WAY FOR QUERIES (ASYNC + AWAIT)
    try{
        let posts = await Post.find({}).populate('user').populate({ path: 'comments', populate: { path: 'user' } });
        let users = await User.find();
        return response.render('home', { title: 'Home', posts: posts, allUsers: users });
    }catch(error){
        console.log('Error : ',error);
        return response.status('500').send();
    }
 
}