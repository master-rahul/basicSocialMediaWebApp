const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    //nodemailer.sendMailFromServiceAccount();
    //nodemailer.refreshToken();
    console.log('Inside new Comment Mailer');
    let htmlString = nodemailer.renderTemplate({comment : comment}, '/new_comment.ejs');
    //console.log(comment);
    nodemailer.transporter.sendMail({
        from : 'ENTER_EMAIL_ADDRESS',
        to : comment.user.email,
        subject : 'New Comment Published',
        //html : '<h1> Your comment has been published </h1>'
        html : htmlString
    }, (error, info) => {
        if(error){console.log('Error in sending mail', error); return;}
        console.log('Mail Sent', info);
        return;
    });
}
