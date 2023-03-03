const cookieParser = require('cookie-parser');       // Fetch cookie-parser modules  .
const { findById } = require('../models/post');
//const db = require('../config/mongoose');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(request, response) {
   // console.log(request);

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
    Post.find({}).populate('user').exec(function(error, posts){
        if(error) return response.redirect('back');
        else return response.render('home',{title : 'Home', posts : posts});
    });

}