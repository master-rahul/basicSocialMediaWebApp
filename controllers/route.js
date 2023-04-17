const cookieParser = require('cookie-parser');       // Fetch cookie-parser modules.
const { findById, populate } = require('../models/post');
//const db = require('../config/mongoose');
const Post = require('../models/post');
const User = require('../models/user');
const Friend = require('../models/friend');
const PendingRequest = require('../models/pendingRequests');
const { options } = require('../routes/user');
const { request } = require('express');

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
        let posts = await Post.find({}).sort('-createdAt')
        .populate({
            path: 'user likes',
            select: '-password' //hides password from the view
        })
        .populate({ 
            path: 'comments likes',
            options : {
                sort : '-createdAt',
                populate :{
                    path : 'user'
                }
            }
        })
        let users = await User.find();
        if(request.user){
            let friend = await User.findById(request.user.id); // getting friend list from 'friends' field
            let friendList =[]; 
            for (friends of friend.friends){
                let ff = await Friend.findOne({ _id: friends._id }) // populating each id of friend list
                            .populate({
                                path: 'from_user',
                                select: 'name'                      // populating 'name' field from_user
                            })
                            .populate({
                                path: 'to_user',    
                                select: 'name'                      // populating 'name' field to_user
                            })
                if(ff.from_user._id == request.user.id) {
                    friendList.push({id : ff.to_user._id, name : ff.to_user.name});         // pushing friend to a friendList
                    users = users.filter(user => user._id.toString() !== ff.to_user._id.toString());    // removing users which are friends.
                }
                else {
                    friendList.push({ id: ff.from_user._id, name: ff.from_user.name });      // pushing friend to a friendList
                    users = users.filter(user => user._id.toString() !== ff.from_user._id.toString()); // removing users which are friends.
                }
                //users = users.filter(user => user._id.toString() != ff.from_user._id.toString() && user._id.toString() != ff.to_user._id.toString());
            }
            //console.log("UserList:  ",users);


            const pendingRequests = await PendingRequest.find({ to_user: request.user.id }).populate({
                path : 'from_user',
                select : 'name'
            });
            const requestedUsersFrom = await PendingRequest.find({from_user : request.user.id});
            for (req of requestedUsersFrom){
                users = users.filter(user => user._id.toString() !== req.to_user._id.toString()); // removing users which are requested to be friends but has not accepted
            }
            const requestedUsersTo = await PendingRequest.find({ to_user: request.user.id });
            for (req of requestedUsersTo) {
                users = users.filter(user => user._id.toString() !== req.from_user._id.toString()); // removing users which are requested to be friends but has not accepted
            }
           // console.log('Requested Users', requestedUsersFrom);

            return response.render('home', { title: 'Home', posts: posts, allUsers: users , friends : friendList, pendingRequests : pendingRequests});
        }else return response.render('home', { title: 'Home', posts: posts, allUsers: users });
    }catch(error){
        console.log('Error : ',error);
        return response.status('500').send();
    }
 
}

module.exports.mailer =  function (request, response) {
    return response.render('mailer');
}
module.exports.getMail = function (request, response) {
    return response.render('getmail');
}