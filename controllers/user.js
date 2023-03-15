const db = require('../config/mongoose');
const User = require('../models/user');

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
        await User.findByIdAndUpdate(request.params.id,{ name: request.body.name, email: request.body.email });
        request.flash('success', 'Profile Updated Successful');
        return response.redirect('back');
    } catch(error){
        return response.status(401).send('Unauthorized');
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
        let find = await User.findById(id);
        return response.render('profile', { title: 'Profile', profileData: find });
    } catch(error){
        return response.status(401).send('Unauthorized');
    }
}

// module.exports.error = function (request, response) {
//     request.flash('error', 'Username And Password Error');
//     return response.redirect('back');
// }