const db = require('../config/mongoose');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.signIn = function (request, response) {
    return response.render('signIn', { title: 'Sign In' })
}
module.exports.signUp = function (request, response) {
    return response.render('signUp', { title: 'Sign Up' })
}
module.exports.add = async function (request, response) {
    if (request.body.password != request.body.confirm_password) return response.redirect('back');

    // SECOND BEST_WAY 
    // User.findOne({ email: request.email }, function (error, user) {
    //     console.log(request.email);
    //     console.log(request.body.email);
    //     if (error) return response.redirect('back');
    //     else if (!user) {
    //         User.create({
    //             name: request.body.name,
    //             email: request.body.email,
    //             password: request.body.password
    //         },  function (error) {
    //                 if (error) return response.redirect('back');
    //                 else return response.redirect('/user/signIn');
    //         });
    //     } else return response.redirect('back');
    // });
    
    // BEST_WAY 
    try{
        let user = await User.findOne({ email: request.body.email });
        if (user){
            request.flash('error', 'User Already Exists');
            return response.redirect('back');
        } 
        else {
            await User.create({ name: request.body.name, email: request.body.email, password: request.body.password });
            request.flash('success', 'Used Added Successfuly');
            return response.redirect('/user/signIn');
        }
    } catch (error) {
            request.flash('error', 'User not Added');
            return response.staus('500').send();
    }

}
module.exports.remove = function (request, response) {
    return response.render('home', { title : 'Remove' })
}
module.exports.update = async function (request, response) {

    // SECOND BEST_WAY
    // if(request.user.id == request.params.id){
    //     User.findByIdAndUpdate(request.params.id, {name : request.body.name, email : request.body.email}, function (error, user) {
    //         if(error) return response.redirect('back');
    //         else return response.redirect('back');
    //     });
    // } else return response.status(401).send('Unauthorized');

    // BEST_WAY
    try{
        if (request.user.id != request.params.id) return response.status(401).send('Unauthorized');
        let user = await User.findById(request.params.id);

        if(request.xhr){
            console.log('XHR');
            User.uploadedAvatar(request, response, function (error) {
                if (error) {
                    request.flash('error', 'File size exceeds 4mb for profile picture');
                    request.flash('success', 'Profile Updated Successful');
                    return response.redirect('back');
                }
                console.log(request.file);
                console.log(request.body);
                user.name = request.body.name;
                user.email = request.body.email;
                if (request.file) {
                    // this is saving the path along with filename in the avatar field of User Schema
                    if (user.avatar != null) fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    user.avatar = User.avatarPath + '/' + request.file.filename;
                }
                user.save();
                request.flash('success', 'Profile Updated Successful');
                return response.status(200).json({
                    data: {
                        profileData : user,
                        name: request.user.name
                    },
                    message: "User Updated!"
                }).send();
            });

        }
        else{
            User.uploadedAvatar(request, response, function (error) {
                if (error) {
                    request.flash('error', 'File size exceeds 4mb for profile picture');
                    request.flash('success', 'Profile Updated Successful');
                    return response.redirect('back');
                }
                console.log(request.file);
                console.log(request.body);
                user.name = request.body.name;
                user.email = request.body.email;
                if (request.file) {
                    // this is saving the path along with filename in the avatar field of User Schema
                    if (user.avatar != null) fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    user.avatar = User.avatarPath + '/' + request.file.filename;
                }
                user.save();
                request.flash('success', 'Profile Updated Successful');
                return response.redirect('back');
            });

        }
        
    
        
       // await User.findByIdAndUpdate(request.params.id,{ name: request.body.name, email: request.body.email });
    } catch(error){
        request.flash('error', 'Unauthorized');
        return response.staus(401).send();
    }
}

module.exports.profile =  async function (request, response) {
    //SECOND BEST_WAY
    var id = request.params.id;
    // if(id == null) id = request.user.id;
    // User.findById(id, function (error, user) {
    //     if(error) return response.redirect('back');
    //     else return response.render('profile', {title : 'Profile', profileData: user});
    // });

    // BEST_WAY
    try{
        if(id == null) id = request.user.id;
        let find = await User.findById(id).select('-password');
        if(find != null) return response.render('profile', { title: 'Profile', profileData: find });
    } catch(error){
        request.flash('error', 'Unauthorized');
        return response.staus(401).send();
    }
}

// module.exports.error = function (request, response) {
//     request.flash('error', 'Username And Password Error');
//     return response.redirect('back');
// }